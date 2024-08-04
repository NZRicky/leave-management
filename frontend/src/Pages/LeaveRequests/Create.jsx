
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Create() {

	const navigateTo = useNavigate();

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [totalDays, setTotalDays] = useState('');

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
		errors.start_date = '';
		errors.end_date = '';
		if (start && new Date() > new Date(start)) {
			errors.start_date = 'Start date cannot be before current date';
		} else if (start && end && (new Date(end) < new Date(start))) {
			errors.end_date = 'End date cannot be before start date';
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


	// format date to "YYYY-MM-DD HH:mm"
	const formatDate = (date) => {
		return moment(date).format("YYYY-MM-DD HH:mm");
	};

	// handle form submission, valid form fields before submit to backend
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formErrors = {};

		if (!startDate) {
			formErrors.start_date = 'Please select a start date';
		}

		// check if start date before current date
		if (new Date() > new Date(startDate)) {
			formErrors.start_date = 'Start date cannot be before current date';
		}

		if (!endDate) {
			formErrors.end_date = 'Please select an end date';
		}

		// check if end date before start date
		if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
			formErrors.end_date = 'End date cannot be before start date';
		}

		if (totalDays == 0) {
			formErrors.totalDays = 'Total leave days is 0';
		}

		if (!leaveType) {
			formErrors.leave_type = 'Please select leave type';
		}

		if (!userId) {
			formErrors.user_id = 'Please select a user';
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
				start_date: formatDate(startDate),
				end_date: formatDate(endDate),
				user_id: userId,
				leave_type: leaveType,
				reason
			});

			// reset form after submission
			setStartDate('');
			setEndDate('');
			setUserId(0);
			setTotalDays('');
			setReason('');
			setLeaveType('');

			// redirect to home page
			navigateTo("/");
		} catch (error) {
			if (error.response && error.response.status === 422) {
				const backendErrors = error.response.data.errors;
				const combinedErrors = { ...formErrors };

				// merge backend errors with frontend errors
				Object.keys(backendErrors).forEach((key) => {
					combinedErrors[key] = backendErrors[key][0];
				});

				setErrors(combinedErrors);
			} else {
				console.log("Error while creating new leave request:", error);
			}
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
					{errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
					<DateTimePicker
						id="end-date"
						value={endDate}
						onChange={handleEndDateChange}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					></DateTimePicker>
					{errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="total-day" className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
					<input
						type="text"
						value={totalDays}
						className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
						readOnly
					/>
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
					{errors.leave_type && <p className="text-red-500 text-sm mt-1">{errors.leave_type}</p>}
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
						<option value="4">Jim</option>
						<option value="5">Kate</option>
						<option value="6">Jack</option>
						<option value="7">Lucy</option>
						<option value="8">Ellen</option>
						<option value="9">Louis</option>
						<option value="10">Max</option>
					</select>
					{errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
				</div>
				<div className="mb-4">
					<label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
					<textarea
						value={reason}
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