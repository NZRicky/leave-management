
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Create() {

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const [userId, setUserId] = useState(0);
	const [reason, setReason] = useState('');
	const [leaveType, setLeaveType] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("http://127.0.0.1:8000/api/leave-requests", {
				startDate,
				endDate,
				userId,
				leaveType,
				reason
			});

			setUserId(0);
			setReason('');
			setLeaveType('');
		} catch (error) {
			console.log("Error while creating new leave request:", error);
		}
	};


	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
			<h2 className="text-2xl font-bold mb-6">New Leave Request</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
					<DateTimePicker
						id="start-date"
						value={startDate}
						onChange={setStartDate}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
					<DateTimePicker
						id="end-date"
						value={endDate}
						onChange={setEndDate}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
				</div>

				<div className="mb-4">
					<label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
					<select
						id="leave-type"
						onChange={setLeaveType}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Please select</option>
						<option value="personal">Personal</option>
						<option value="sick">Sick</option>
						<option value="vacation">Vacation</option>
						<option value="bereavement">Bereavement</option>
					</select>
				</div>
				<div className="mb-4">
					<label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">User</label>
					<select
						id="user"
						onChange={setUserId}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Please select</option>
						<option value="1">Ricky</option>
						<option value="2">Susan</option>
						<option value="3">Richard</option>

					</select>
				</div>
				<div className="mb-4">
					<label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
					<textarea
						id="reason"
						onChange={(e) => setReason(e.target.value)}
						rows="4"
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></textarea>
				</div>
				<div>
					<Link
						to="/" 
						className="inline-block px-4 py-2 mr-4 bg-gray-600 text-white font-medium rounded-md shadow-sm hover:bg-grey-700"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}