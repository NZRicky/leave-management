<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LeaveRequestControllerTest extends TestCase
{
    /**
     * test index method of the controller
     */
    public function test_index_returns_a_successful_response(): void
    {
        $response = $this->get('/api/leave-requests');

        $response->assertStatus(200);
    }

    /**
     * test store method of the controller
     */
    public function test_store_returns_a_successful_response(): void
    {
        $response = $this->post('/api/leave-requests');

        $response->assertStatus(200);

    }

}
