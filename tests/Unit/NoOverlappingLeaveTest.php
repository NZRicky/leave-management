<?php

namespace Tests\Unit;

use App\Models\LeaveRequest;
use App\Models\User;
use App\Rules\NoOverlappingLeave;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoOverlappingLeaveTest extends TestCase
{
    private $userId;

    public function setUp(): void
    {
        parent::setUp();

        // create a new fake data before test
        $user = User::factory()->create();
      
        LeaveRequest::factory()->create([
            'user_id' => $user->id,
            'start_date' => '2024-08-05 00:00:00',
            'end_date' => '2024-08-10 23:59:59',
            'leave_type' => 'sick',
            'reason' => 'not feeling well'
        ]);

        LeaveRequest::factory()->create([
            'user_id' => $user->id,
            'start_date' => '2024-08-15 00:00:00',
            'end_date' => '2024-08-18 23:59:59',
            'leave_type' => 'vacation',
            'reason' => 'holiday'
        ]);

        $this->userId = $user->id;
    }

    /**
     * test start date overlap with existing leave 
     */
    public function test_fails_validation_if_leave_request_overlaps(): void
    {
        $rule = new NoOverlappingLeave($this->userId, '2024-08-08 09:00:00', '2024-08-10 17:00:00');

        $this->assertFalse($rule->passes('start_date', '2024-08-08 09:00:00'));
    }

    /**
     * test start date not overlap with existing leave
     * @return void
     */
    public function test_leave_request_does_not_overlap()
    {
        $rule = new NoOverlappingLeave($this->userId, '2024-08-26 00:00:00', '2024-08-27 23:59:59');

        $passes = $rule->passes('start_date', '2024-08-26 00:00:00');

        $this->assertTrue($passes);
    }

}
