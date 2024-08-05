export const FilterBar = ({
	filterUser, setFilterUser,
	filterStartDate, setFilterStartDate,
	filterEndDate, setFilterEndDate,
	handleFilter, handleResetFilter,
}) => (
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
);
