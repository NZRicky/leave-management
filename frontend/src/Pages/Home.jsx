import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

	const [leaveRequests, setLeaveRequests] = useState([]);

	// calculate leave days with 2 decimal place
	const calculateLeaveDays = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diffInMs = end - start;
		const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
		return diffInDays.toFixed(2);
	}

	// fetch backend leave requests json data
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
		<div>
			<Link
				to="/leave-requests/create"
				className="px-4 py-2 mt-4 rounded-md bg-blue-500 text-white float-right mb-10 hover:bg-indigo-700"
			>
				Create new Leave Request
			</Link>
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
								<td className="px-6 py-2 whitespace-nowrap">{calculateLeaveDays(leaveRequest.start_date, leaveRequest.end_date)}</td>
								<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.leave_type}</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>
		</div>
	);
}