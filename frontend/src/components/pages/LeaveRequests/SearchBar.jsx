export const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => (
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
);
