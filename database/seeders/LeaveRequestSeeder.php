<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class LeaveRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // get all user ids to random
        $userIds = DB::table('users')->pluck('id')->toArray();

        $faker = Faker::create();

        // Number of records to insert
        $totalRecords = 10000;

        // Number of records per batch
        $batchSize = 1000;

        for ($i = 0; $i < $totalRecords; $i += $batchSize) {

            $data = [];
    
            for ($j = 0; $j < $batchSize; $j++) {

                $startDate = $faker->dateTimeBetween('-1 year', 'now');
                $hoursToAdd = rand(24, 240); // 1 - 10 days
                $endDate = (clone $startDate)->modify('+' . $hoursToAdd . ' hours');

                $data[] = [
                    'start_date' => $startDate->format('Y-m-d H:i:s'),
                    'end_date' => $endDate->format('Y-m-d H:i:s'),
                    'leave_type' => $faker->randomElement(['personal', 'sick', 'vacation', 'bereavement']),
                    'reason' => $faker->text(50),
                    'user_id' => $faker->randomElement($userIds),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('leave_requests')->insert($data);
        }
    }


}
