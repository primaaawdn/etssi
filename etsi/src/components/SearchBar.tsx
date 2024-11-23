"use client";
import { useState } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = () => {
		onSearch(searchInput.trim());
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div>
			<label className="input input-bordered flex items-center gap-2">
				<input
					type="text"
					className="grow search-input"
					placeholder="Search for products..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="h-4 w-4 opacity-70"
					onClick={handleSearch} 
				>
					<path
						fillRule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</label>
		</div>
	);
};

export default SearchBar;
