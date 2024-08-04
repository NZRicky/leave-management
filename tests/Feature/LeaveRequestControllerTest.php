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
                'user_id' => $leaveRequest->user_id,
                'user_name' => $leaveRequest->user->name,
                'start_date' => $leaveRequest->start_date,
                'end_date' => $leaveRequest->end_date,
                'leave_type' => $leaveRequest->leave_type,
                'reason' => $leaveRequest->reason

            ]);

        $this->assertDatabaseHas('leave_requests', [
            'user_id' => $leaveRequest->user_id,
            'start_date' => $leaveRequest->start_date,
            'end_date' => $leaveRequest->end_date,
            'leave_type' => $leaveRequest->leave_type,
            'reason' => $leaveRequest->reason
        ]);

    }


    /**
     * test update method of the controller
     */
    public function test_can_update_leave_request(): void
    {
        // create a new fake leave request in database first
        $leaveRequest = LeaveRequest::factory()->create();

        $updatedData = [
            'id' => $leaveRequest->id,
            'user_id' => $leaveRequest->user_id,
            'start_date' => '2022-10-22 11:30:00',
            'end_date' => '2022-10-24 11:30:00',
            'user_name' => $leaveRequest->user->name,
            'leave_type' => 'sick',
            'reason' => 'test reason'
        ];

        // update it with provided data 
        $response = $this->putJson('/api/leave-requests/' . $leaveRequest->id, $updatedData);

        $response->assertStatus(200)
            ->assertJson($updatedData);

        $leaveRequest->refresh();

        $this->assertEquals($updatedData['user_id'], $leaveRequest->user_id);
        $this->assertEquals($updatedData['start_date'], $leaveRequest->start_date);
        $this->assertEquals($updatedData['end_date'], $leaveRequest->end_date);
        $this->assertEquals($updatedData['leave_type'], $leaveRequest->leave_type);
        $this->assertEquals($updatedData['reason'], $leaveRequest->reason);
    }


    /**
     * test delete method of the controller
     */
    public function test_can_delete_leave_request(): void
    {
        // create a new fake leave request in database first
        $leaveRequest = LeaveRequest::factory()->create();

        $response = $this->deleteJson(route('leave-requests.destroy', $leaveRequest));

        $response->assertStatus(204);

        $this->assertDatabaseMissing('leave_requests', ['id' => $leaveRequest->id]);

    }


}
