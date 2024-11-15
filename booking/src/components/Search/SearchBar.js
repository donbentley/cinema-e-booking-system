import {
	AdjustmentsHorizontalIcon,
	MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const SearchBar = ({ movies = [], onFilter }) => {
	const [filterType, setFilterType] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("");
	const [nameSearch, setNameSearch] = useState("");
	const [showFilters, setShowFilters] = useState(false); // State to toggle filter visibility

	// Filter options
	const categoryOptions = ["action", "drama", "comedy", "horror"];
	const ratingOptions = ["g", "pg", "pg-13", "r"];

	// Handle filter type selection
	const handleFilterTypeChange = (type) => {
		setFilterType(type);
		setSelectedFilter("");
		setNameSearch("");
	};

	// Apply filter and send filtered data to parent component
	const handleFilter = () => {
		let filtered = movies;

		if (filterType === "category" && selectedFilter) {
			filtered = movies.filter(
				(movie) => movie.category.toLowerCase() === selectedFilter
			);
		} else if (filterType === "rating" && selectedFilter) {
			filtered = movies.filter(
				(movie) => movie.mpaaRating.toLowerCase() === selectedFilter
			);
		} else if (filterType === "name" && nameSearch) {
			filtered = movies.filter((movie) =>
				movie.title.toLowerCase().includes(nameSearch.toLowerCase())
			);
		}

		// Check if onFilter is a function before calling it
		if (typeof onFilter === "function") {
			onFilter(filtered);
		} else {
			console.error("onFilter is not a function");
		}
	};

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between w-full mx-auto my-2 space-x-4">
			{/* Toggle Button for Filter Options */}
			<button
				onClick={() => setShowFilters(!showFilters)} // Toggle visibility
				className="flex items-center justify-between space-x-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-white rounded-full shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			>
				<AdjustmentsHorizontalIcon className="w-5 h-5" />
				<span className="font-light">filter</span>
				<ChevronDownIcon
					aria-hidden="true"
					className={`-mr-1 w-4 h-4 transition-transform ${
						showFilters ? "rotate-180" : ""
					}`}
				/>
			</button>

			{/* Filter Options */}
			{showFilters && (
				<div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4 sm:mt-0 space-x-4">
					{/* Filter Type Selection */}
					<div className="relative flex items-center flex-grow">
						<Menu as="div" className="relative w-full">
							<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
								{filterType ? filterType : "by..."}
								<ChevronDownIcon
									aria-hidden="true"
									className="-mr-1 size-5 text-gray-400"
								/>
							</MenuButton>
							<MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none">
								<MenuItem>
									<a
										onClick={() => handleFilterTypeChange("category")}
										className="block px-4 py-2 text-sm text-gray-700"
									>
										category
									</a>
								</MenuItem>
								<MenuItem>
									<a
										onClick={() => handleFilterTypeChange("rating")}
										className="block px-4 py-2 text-sm text-gray-700"
									>
										rating
									</a>
								</MenuItem>
								<MenuItem>
									<a
										onClick={() => handleFilterTypeChange("name")}
										className="block px-4 py-2 text-sm text-gray-700"
									>
										title
									</a>
								</MenuItem>
							</MenuItems>
						</Menu>
					</div>

					{/* category Dropdown */}
					{filterType === "category" && (
						<Menu as="div" className="relative flex-grow">
							<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
								{selectedFilter || "select category"}
								<ChevronDownIcon
									aria-hidden="true"
									className="-mr-1 size-5 text-gray-400"
								/>
							</MenuButton>
							<MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none">
								{categoryOptions.map((category) => (
									<MenuItem key={category}>
										<a
											onClick={() => setSelectedFilter(category)}
											className="block px-4 py-2 text-sm text-gray-700"
										>
											{category}
										</a>
									</MenuItem>
								))}
							</MenuItems>
						</Menu>
					)}

					{/* rating Dropdown */}
					{filterType === "rating" && (
						<Menu as="div" className="relative flex-grow">
							<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
								{selectedFilter || "select rating"}
								<ChevronDownIcon
									aria-hidden="true"
									className="-mr-1 size-5 text-gray-400"
								/>
							</MenuButton>
							<MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none">
								{ratingOptions.map((rating) => (
									<MenuItem key={rating}>
										<a
											onClick={() => setSelectedFilter(rating)}
											className="block px-4 py-2 text-sm text-gray-700"
										>
											{rating}
										</a>
									</MenuItem>
								))}
							</MenuItems>
						</Menu>
					)}

					{/* Movie Name Search */}
					{filterType === "name" && (
						<input
							type="text"
							className="border border-slate-300 rounded-full px-2 py-1 w-full"
							placeholder="type movie name..."
							value={nameSearch}
							onChange={(e) => setNameSearch(e.target.value)}
						/>
					)}

					{/* Search Button */}
					<button
						onClick={handleFilter}
						className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
					>
						<MagnifyingGlassCircleIcon className="h-4 w-4" />
					</button>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
