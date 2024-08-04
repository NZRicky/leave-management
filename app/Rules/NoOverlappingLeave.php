<?php

namespace App\Rules;

use App\Models\LeaveRequest;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoOverlappingLeave implements ValidationRule
{

    protected $userId;
    protected $startDate;
    protected $endDate;

    public function __construct($userId, $startDate, $endDate)
    {
        $this->userId = $userId;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    /**
     * Run the validation rule to check if user request leave overlap the existing leave
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->passes($attribute, $value)) {
            $fail('The leave request overlaps with an existing one.');
        }
    }


    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $isOverlappingLeave = LeaveRequest::where('user_id', $this->userId)
            ->where(function ($query) {
                $query->whereBetween('start_date', [$this->startDate, $this->endDate])
                    ->orWhereBetween('end_date', [$this->startDate, $this->endDate])
                    ->orWhere(function ($query) {
                        $query->where('start_date', '<=', $this->startDate)
                            ->where('end_date', '>=', $this->endDate);
                    });
            })
            ->exists();

        return !$isOverlappingLeave;
    }
}
