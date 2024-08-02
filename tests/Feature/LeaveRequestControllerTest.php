<?php

namespace Tests\Feature;

use App\Models\LeaveRequest;
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
    public function test_can_store_new_leave_request(): void
    {
        // get fake leave request
        $leaveRequest = LeaveRequest::factory()->make();

        $response = $this->postJson('/api/leave-requests', [
            'user_id' => $leaveRequest->user_id,
            'start_date' => $leaveRequest->start_date,
            'end_date' => $leaveRequest->end_date,
            'leave_type' => $leaveRequest->leave_type,
            'reason' => $leaveRequest->reason
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'user_id' => $leaveRequest->user_id,
                    'start_date' => $leaveRequest->start_date,
                    'end_date' => $leaveRequest->end_date,
                    'leave_type' => $leaveRequest->leave_type,
                    'reason' => $leaveRequest->reason
                ]
            ]);

        $this->assertDatabaseHas('leave_requests', [
            'user_id' => $leaveRequest->user_id,
            'start_date' => $leaveRequest->start_date,
            'end_date' => $leaveRequest->end_date,
            'leave_type' => $leaveRequest->leave_type,
            'reason' => $leaveRequest->reason
        ]);

    }

}
