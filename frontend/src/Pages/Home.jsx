import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function Home() {

	const [leaveRequests, setLeaveRequests] = useState([]);
	const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);

	const [sortColumn, setSortColumn] = useState("start_date");
	const [sortDirection, setSortDirection] = useState("asc");

	const [filterUser, setFilterUser] = useState("");
	const [filterStartDate, setFilterStartDate] = useState("");
	const [filterEndDate, setFilterEndDate] = useState("");

	const [searchTerm, setSearchTerm] = useState("");

	const [groupedLeaveRequests, setGroupedLeaveRequests] = useState({});
	// state to toggle between grouped and ungrouped views
	const [viewGrouped, setViewGrouped] = useState(false);


	// group leave requests by user
	const groupByUser = (data) => {
		const groupedData = data.reduce((user, leaveRequestData) => {
			console.log('user', user);
			console.log('leaveRequestData', leaveRequestData);
			if (!user[leaveRequestData.user_id]) {
				user[leaveRequestData.user_id] = [];
			}
			user[leaveRequestData.user_id].push(leaveRequestData);
			return user;
		}, {});

		console.log('groupedData', groupedData);
		setGroupedLeaveRequests(groupedData);
	};

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
				setFilteredLeaveRequests(response.data);

				// group data by user
				groupByUser(response.data);
			})
			.catch((error) => {
				console.error('Error while fetching data:', error);
			})
	}, []);

	// sort function 
	const handleSort = (column) => {
		const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";

		setSortColumn(column);
		setSortDirection(newDirection);

		const sortedData = [...filteredLeaveRequests].sort((a, b) => {
			if (column === 'no_of_days') {
				return (calculateLeaveDays(a.start_date, a.end_date) - calculateLeaveDays(b.start_date, b.end_date)) * (newDirection === 'asc' ? 1 : -1);
			}
			if (a[column] < b[column]) {
				return newDirection === 'asc' ? -1 : 1;
			}
			if (a[column] > b[column]) {
				return newDirection === 'asc' ? 1 : -1;
			}
			return 0;
		});

		setFilteredLeaveRequests(sortedData);
		// group filtered data by user
		groupByUser(sortedData);
	};

	// filter function
	const handleFilter = () => {
		let filteredData = leaveRequests;

		if (filterUser) {
			filteredData = filteredData.filter(item => item.user_name.toString().toLowerCase().includes(filterUser.toLowerCase()));
		}

		if (filterStartDate) {
			filteredData = filteredData.filter(item => new Date(item.start_date) >= new Date(filterStartDate));
		}

		if (filterEndDate) {
			filteredData = filteredData.filter(item => new Date(item.end_date) <= new Date(filterEndDate));
		}

		setFilteredLeaveRequests(filteredData);
	};

	// reset filter function
	const handleResetFilter = () => {
		setFilterUser('');
		setFilterStartDate('');
		setFilterEndDate('');

		setFilteredLeaveRequests(leaveRequests);
	};

	// Search function
	const handleSearch = () => {
		const searchedData = leaveRequests.filter(item =>
			item.user_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.start_date.includes(searchTerm) ||
			item.end_date.includes(searchTerm) ||
			item.leave_type.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilteredLeaveRequests(searchedData);

		// group searched data by user
		groupByUser(searchedData);
	};

	// get sorting icon based on the current sorting state
	const getSortIcon = (column) => {
		if (sortColumn !== column) {
			return <FaSort />;
		}
		return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
	};

	// render grouped or ungrouped leave requests
	const renderLeaveRequests = () => {
		if (viewGrouped) {
			console.log(Object.keys(groupedLeaveRequests));
			return Object.keys(groupedLeaveRequests).map(userId => (
				<div key={userId}>
					<h3>User ID: {userId}</h3>
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-100">
							<tr>
								<th
									onClick={() => handleSort('user_name')}
									className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
								>User {getSortIcon('user_name')}</th>
								<th
									onClick={() => handleSort('start_date')}
									className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
								>Start Date {getSortIcon('start_date')}</th>
								<th
									onClick={() => handleSort('end_date')}
									className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
								>End Date {getSortIcon('end_date')}</th>
								<th
									onClick={() => handleSort('no_of_days')}
									className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
								>No. of Days {getSortIcon('no_of_days')}</th>
								<th
									onClick={() => handleSort('leave_type')}
									className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
								>Leave Type {getSortIcon('leave_type')}</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{groupedLeaveRequests[userId].map((leaveRequest) => (
								<tr className="odd:bg-gray-50 even:bg-white" key={leaveRequest.id}>
									<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.user_name}</td>
									<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.start_date}</td>
									<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.end_date}</td>
									<td className="px-6 py-2 whitespace-nowrap">{calculateLeaveDays(leaveRequest.start_date, leaveRequest.end_date)}</td>
									<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.leave_type}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			));
		} else {
			return (
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th
								onClick={() => handleSort('user_name')}
								className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
							>User {getSortIcon('user_name')}</th>
							<th
								onClick={() => handleSort('start_date')}
								className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
							>Start Date {getSortIcon('start_date')}</th>
							<th
								onClick={() => handleSort('end_date')}
								className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
							>End Date {getSortIcon('end_date')}</th>
							<th
								onClick={() => handleSort('no_of_days')}
								className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
							>No. of Days {getSortIcon('no_of_days')}</th>
							<th
								onClick={() => handleSort('leave_type')}
								className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
							>Leave Type {getSortIcon('leave_type')}</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredLeaveRequests && filteredLeaveRequests.map((leaveRequest) => (
							<tr className="odd:bg-gray-50 even:bg-white" key={leaveRequest.id}>
								<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.user_name}</td>
								<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.start_date}</td>
								<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.end_date}</td>
								<td className="px-6 py-2 whitespace-nowrap">{calculateLeaveDays(leaveRequest.start_date, leaveRequest.end_date)}</td>
								<td className="px-6 py-2 whitespace-nowrap">{leaveRequest.leave_type}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	};

	return (
		<div>
			<Link
				to="/leave-requests/create"
				className="px-4 py-2 mt-4 rounded-md bg-blue-500 text-white float-right mb-10 hover:bg-indigo-700"
			>
				Create new Leave Request
			</Link>

			<div className="mb-4">
				<input
					type="text"
					placeholder="Filter by User"
					value={filterUser}
					onChange={(e) => setFilterUser(e.target.value)}
					className="px-2 py-1 border border-gray-300 rounded mr-2"
				/>
				From:&nbsp;
				<input
					type="date"
					placeholder="Filter by Start Date"
					value={filterStartDate}
					onChange={(e) => setFilterStartDate(e.target.value)}
					className="px-2 py-1 border border-gray-300 rounded mr-2"
				/>
				To:&nbsp;
				<input
					type="date"
					placeholder="Filter by End Date"
					value={filterEndDate}
					onChange={(e) => setFilterEndDate(e.target.value)}
					className="px-2 py-1 border border-gray-300 rounded mr-2"
				/>
				<button
					onClick={handleFilter}
					className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700"
				>
					Filter
				</button>
				<button
					onClick={handleResetFilter}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
				>
					Reset
				</button>

			</div>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="px-2 py-1 border border-gray-300 rounded mr-2"
				/>
				<button
					onClick={handleSearch}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
				>
					Search
				</button>
			</div>
			<div className="mb-4">
				<button
					onClick={() => setViewGrouped(true)}
					className={`px-4 py-2 mr-2 ${viewGrouped ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded hover:bg-blue-700`}
				>
					Group by User
				</button>
				<button
					onClick={() => setViewGrouped(false)}
					className={`px-4 py-2 ${viewGrouped ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded hover:bg-blue-700`}
				>
					Show All
				</button>
			</div>

			<div className="table-wrapper">
				{renderLeaveRequests()}
			</div>
		</div>
	);
}