import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

	const [leaveRequests, setLeaveRequests] = useState([]);

	useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/leave-requests")
			.then((response) => {
				setLeaveRequests(response.data);
			})
			.catch((error) => {
				console.error('Error while fetching data:', error);
			})
	}, []);

	return (

		<div className="table-wrapper">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
						<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
						<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">End Date</th>
						<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">No. of Days</th>
						<th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Leave Type</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{leaveRequests && leaveRequests.map((leaveRequest) => (
						<tr className="odd:bg-gray-50 even:bg-white" key={leaveRequest.id}>
							<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.user_id}</td>
							<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.start_date}</td>
							<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.end_date}</td>
							<td className="px-6 py-2 whitespace-nowrap"></td>
							<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.leave_type}</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
}