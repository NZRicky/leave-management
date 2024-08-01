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
                $data[] = [
                    'start_date' => $faker->date(),
                    'end_date' => $faker->date(),
                    'leave_type' => $faker->randomElement(['personal', 'sick', 'vacation', 'bereavement']),
                    'reason' => $faker->text(100),
                    'user_id' => $faker->randomElement($userIds),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            DB::table('leave_requests')->insert($data);
        }
    }


}
