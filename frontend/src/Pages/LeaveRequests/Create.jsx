
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function Create() {

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	return (
		<div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
			<h2 className="text-2xl font-bold mb-6">New Leave Request</h2>
			<form>
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
					<label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">Select Leave Type</label>
					<select
						id="leave-type"
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
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
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="1">Ricky</option>
						<option value="2">Susan</option>
						<option value="3">Richard</option>

					</select>
				</div>
				<div className="mb-4">
					<label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
					<textarea
						id="reason"
						rows="4"
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></textarea>
				</div>
				<div>
					<button
						type="submit"
						className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}