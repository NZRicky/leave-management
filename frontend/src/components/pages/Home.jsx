import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { LeaveRequestsTable } from "./LeaveRequests/LeaveRequestsTable";
import { useLeaveRequests } from "../../hooks/useLeaveRequests";
import { calculateLeaveDays } from "../../utils/utils";
import { useFilter } from "../../hooks/useFilter";
import { SearchBar } from "./LeaveRequests/SearchBar";
import { FilterBar } from "./LeaveRequests/FilterBar";

export default function Home() {

	// use useLeaveRequests hook
	const {
		leaveRequests,
		filteredLeaveRequests,
		setFilteredLeaveRequests,
		groupedLeaveRequests,
		groupByUser,
	} = useLeaveRequests();

	// useFilter hook
	const {
		filterUser,
		setFilterUser,
		filterStartDate,
		setFilterStartDate,
		filterEndDate,
		setFilterEndDate,
		handleFilter,
		handleResetFilter,
	} = useFilter(leaveRequests, setFilteredLeaveRequests);

	const [sortColumn, setSortColumn] = useState("start_date");
	const [sortDirection, setSortDirection] = useState("asc");

	const [searchTerm, setSearchTerm] = useState("");

	// state to toggle between grouped and ungrouped views
	const [viewGrouped, setViewGrouped] = useState(false);

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
			return Object.keys(groupedLeaveRequests).map(userId => (
				<div key={userId}>
					<h3>User ID: {userId}</h3>
					<LeaveRequestsTable
						data={groupedLeaveRequests[userId]}
						sortColumn={sortColumn}
						sortDirection={sortDirection}
						handleSort={handleSort}
						getSortIcon={getSortIcon}
					/>
				</div>
			));
		} else {
			return (
				<LeaveRequestsTable
					data={filteredLeaveRequests}
					sortColumn={sortColumn}
					sortDirection={sortDirection}
					handleSort={handleSort}
					getSortIcon={getSortIcon}
				/>
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

			<FilterBar
				filterUser={filterUser}
				setFilterUser={setFilterUser}
				filterStartDate={filterStartDate}
				setFilterStartDate={setFilterStartDate}
				filterEndDate={filterEndDate}
				setFilterEndDate={setFilterEndDate}
				handleFilter={handleFilter}
				handleResetFilter={handleResetFilter}
			/>
			<SearchBar
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				handleSearch={handleSearch}
			/>
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