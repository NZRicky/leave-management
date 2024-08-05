import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { calculateLeaveDays } from "../../../utils/utils";

export const LeaveRequestsTable = ({ data, sortColumn, sortDirection, handleSort, getSortIcon }) => (
	<table className="min-w-full divide-y divide-gray-200">
		<thead className="bg-gray-100">
			<tr>
				<th
					onClick={() => handleSort('user_name')}
					className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
				>User {getSortIcon('user_name', FaSort, FaSortUp, FaSortDown)}</th>
				<th
					onClick={() => handleSort('start_date')}
					className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
				>Start Date {getSortIcon('start_date', FaSort, FaSortUp, FaSortDown)}</th>
				<th
					onClick={() => handleSort('end_date')}
					className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
				>End Date {getSortIcon('end_date', FaSort, FaSortUp, FaSortDown)}</th>
				<th
					onClick={() => handleSort('no_of_days')}
					className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
				>No. of Days {getSortIcon('no_of_days', FaSort, FaSortUp, FaSortDown)}</th>
				<th
					onClick={() => handleSort('leave_type')}
					className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
				>Leave Type {getSortIcon('leave_type', FaSort, FaSortUp, FaSortDown)}</th>
			</tr>
		</thead>
		<tbody className="bg-white divide-y divide-gray-200">
			{data.map((leaveRequest) => (
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