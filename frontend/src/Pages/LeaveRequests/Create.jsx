
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

	const [totalDays, setTotalDays] = useState(0);

	const [userId, setUserId] = useState(0);
	const [reason, setReason] = useState('');
	const [leaveType, setLeaveType] = useState('');

	const [errors, setErrors] = useState({});

	// calculate total leave days for given start date and end date
    const calculateTotalDays = (start, end) => {
        if (start && end && new Date(end) > new Date(start)) {
            const diffTime = new Date(end) - new Date(start);
            const diffDays = (diffTime / (1000 * 60 * 60 * 24)).toFixed(2);
            setTotalDays(diffDays);
        } else {
            setTotalDays(0);
        }
    };

	// valid start date & end date to show related error message when field value changed
	const validStartAndEndDate = (start, end) => {
		errors.startDate = '';
		errors.endDate = '';
		if (start && new Date() > new Date(start)) {
			errors.startDate = 'Start date cannot be before current date';
		} else if (start && end && (new Date(end) < new Date(start))) {
			errors.endDate = 'End date cannot be before start date';
		}	
	};
	
	// handle start date change to show related errors
	const handleStartDateChange = (date) => {
		setStartDate(date);
		calculateTotalDays(date, endDate);

		validStartAndEndDate(date, endDate);
	};

	// handle end date change to show related errors
	const handleEndDateChange = (date) => {
		setEndDate(date);
		calculateTotalDays(startDate, date);

		validStartAndEndDate(startDate, date);
	};



	// handle form submission, valid form fields before submit to backend
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

		if (totalDays == 0) {
			formErrors.totalDays = 'Total leave days is 0';
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

		// no form errors, backend to process the form
		try {
			await axios.post("http://127.0.0.1:8000/api/leave-requests", {
				start_date: startDate,
				end_date: endDate,
				user_id: userId,
				leave_type: leaveType,
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
						onChange={handleStartDateChange}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
					{errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
					<DateTimePicker
						id="end-date"
						value={endDate}
						onChange={handleEndDateChange}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
					{errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="total-day" className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
					<input 
						type="text" 
						value={totalDays}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" 
						readOnly />
						{errors.totalDays && <p className="text-red-500 text-sm mt-1">{errors.totalDays}</p>}
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