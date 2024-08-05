// calculate leave total days for start date & end date
export const calculateLeaveDays = (startDate, endDate) => {

	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffInMs = end - start;
	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
	
	return diffInDays.toFixed(2);
};
