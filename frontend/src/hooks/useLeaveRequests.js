import { useEffect, useState } from "react";
import axios from "axios";

export const useLeaveRequests = () => {
	
	const [leaveRequests, setLeaveRequests] = useState([]);
	const [filteredLeaveRequests, setFilteredLeaveRequests] = useState([]);
	const [groupedLeaveRequests, setGroupedLeaveRequests] = useState({});

	// fetch backend leave requests json data	
	useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/leave-requests")
			.then((response) => {
				setLeaveRequests(response.data);
				setFilteredLeaveRequests(response.data);
				groupByUser(response.data);
			})
			.catch((error) => {
				console.error('Error while fetching data:', error);
			});
	}, []);

	// group user by user_id
	const groupByUser = (data) => {
		const groupedData = data.reduce((user, leaveRequestData) => {
			if (!user[leaveRequestData.user_id]) {
				user[leaveRequestData.user_id] = [];
			}

			user[leaveRequestData.user_id].push(leaveRequestData);

			return user;
		}, {});

		setGroupedLeaveRequests(groupedData);
	};

	return {
		leaveRequests,
		filteredLeaveRequests,
		setFilteredLeaveRequests,
		groupedLeaveRequests,
		groupByUser,
	};
};
