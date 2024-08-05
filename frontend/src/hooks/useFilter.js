import { useState } from "react";

export const useFilter = (data, setData) => {
	const [filterUser, setFilterUser] = useState("");
	const [filterStartDate, setFilterStartDate] = useState("");
	const [filterEndDate, setFilterEndDate] = useState("");

	// filter function
	const handleFilter = () => {
		let filteredData = data;

		if (filterUser) {
			filteredData = filteredData.filter(item => item.user_name.toString().toLowerCase().includes(filterUser.toLowerCase()));
		}

		if (filterStartDate) {
			filteredData = filteredData.filter(item => new Date(item.start_date) >= new Date(filterStartDate));
		}

		if (filterEndDate) {
			filteredData = filteredData.filter(item => new Date(item.end_date) <= new Date(filterEndDate));
		}

		setData(filteredData);
	};

	// reset filter function
	const handleResetFilter = () => {
		setFilterUser('');
		setFilterStartDate('');
		setFilterEndDate('');

		setData(data);
	};

	return {
		filterUser,
		setFilterUser,
		filterStartDate,
		setFilterStartDate,
		filterEndDate,
		setFilterEndDate,
		handleFilter,
		handleResetFilter,
	};
};
