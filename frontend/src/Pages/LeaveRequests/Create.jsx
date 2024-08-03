
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Create() {

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [userId, setUserId] = useState(0);
	const [reason, setReason] = useState('');
	const [leaveType, setLeaveType] = useState('');

	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formErrors = {};

		if (!startDate) {
			formErrors.startDate = 'Please select a start date';
		}

		// check if start date before current date
		if (new Date() > new Date(startDate)) {
            formErrors.startDate = 'Start date cannot be before current date';
        }		
		
		if (!endDate) {
			formErrors.endDate = 'Please select an end date';
		}

		// check if end date before start date
		if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            formErrors.endDate = 'End date cannot be before start date';
        }

		if (!leaveType) {
			formErrors.leaveType = 'Please select leave type';
		}
		
		if (!userId) {
			formErrors.userId = 'Please select a user';
		}

		if (!reason) {
			formErrors.reason = 'Please provide a reason';
		}

		setErrors(formErrors);

		if (Object.keys(formErrors).length !== 0) {
			return false;
		}

		console.log(startDate, endDate, userId, leaveType, reason);

		// no form errors, backend to process the form
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
					<label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
					<DateTimePicker
						id="start-date"
						value={startDate}
						onChange={setStartDate}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
					{errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
					<DateTimePicker
						id="end-date"
						value={endDate}
						onChange={setEndDate}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
					{errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
				</div>

				<div className="mb-4">
					<label htmlFor="leave-type" className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
					<select
						id="leave-type" 
						value={leaveType} 
						onChange={(e) => setLeaveType(e.target.value)}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Please select</option>
						<option value="personal">Personal</option>
						<option value="sick">Sick</option>
						<option value="vacation">Vacation</option>
						<option value="bereavement">Bereavement</option>
					</select>
					{errors.leaveType && <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">User</label>
					<select
						id="user" 
						value={userId} 
						onChange={(e) => setUserId(e.target.value)}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Please select</option>
						<option value="1">Ricky</option>
						<option value="2">Susan</option>
						<option value="3">Richard</option>
					</select>
					{errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
					<textarea 
						maxLength={50}
						id="reason"
						onChange={(e) => setReason(e.target.value)}
						rows="4"
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></textarea>
					{errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
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