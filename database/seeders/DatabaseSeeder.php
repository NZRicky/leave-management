<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create 10 fake users
        User::factory(10)->create();

        // create fake leave requests
        $this->call(LeaveRequestSeeder::class);

    }
}
