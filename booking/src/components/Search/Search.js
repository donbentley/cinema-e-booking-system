import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchGrid from "./SearchGrid";

const Search = ({ movies }) => {
	const [filteredMovies, setFilteredMovies] = useState(movies);
	const [showResults, setShowResults] = useState(false); // Add showResults state

	const handleFilter = (filtered) => {
		setFilteredMovies(filtered);
		setShowResults(true); // Show results when filter is applied
	};

	useEffect(() => {
		setFilteredMovies(movies);
	}, [movies]);

	return (
		<div className="bg-gradient-to-r p-6 min-h">
			<SearchBar movies={movies} onFilter={handleFilter} />
			{/* Conditionally render SearchGrid or "No results found" based on filteredMovies */}
			{showResults && (
				<div className="container mx-auto p-4 text-center">
					{filteredMovies.length > 0 ? (
						<SearchGrid movies={filteredMovies} />
					) : (
						<p className="text-xl text-red font-light">No results found</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
