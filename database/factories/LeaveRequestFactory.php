<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeaveRequest>
 */
class LeaveRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // get all user ids to random
        $userIds = DB::table('users')->pluck('id')->toArray();

        $startDate = fake()->dateTimeBetween('-1 year', 'now');
        $hoursToAdd = rand(24, 240); // 1 - 10 days
        $endDate = (clone $startDate)->modify('+' . $hoursToAdd . ' hours');

        return [
            'start_date' => $startDate->format('Y-m-d H:i:s'),
            'end_date' => $endDate->format('Y-m-d H:i:s'),
            'leave_type' => fake()->randomElement(['personal', 'sick', 'vacation', 'bereavement']),
            'reason' => fake()->text(100),
            'user_id' => fake()->randomElement($userIds),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
