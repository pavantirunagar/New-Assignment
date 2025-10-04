import React from 'react';

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  locations: string[];
  industries: string[];
  setCurrentPage: (value: number) => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  setSearch,
  selectedLocation,
  setSelectedLocation,
  selectedIndustry,
  setSelectedIndustry,
  sortOrder,
  setSortOrder,
  locations,
  industries,
  setCurrentPage,
}) => {
  return (
    <div className="mb-5 flex flex-col md:flex-row gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by company name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 sm:p-3 rounded w-full md:w-1/4"
      />

      {/* Location Dropdown */}
      <select
        value={selectedLocation}
        onChange={(e) => {
          setSelectedLocation(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 sm:p-3 rounded w-full md:w-1/4"
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      {/* Industry Dropdown */}
      <select
        value={selectedIndustry}
        onChange={(e) => {
          setSelectedIndustry(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 sm:p-3 rounded w-full md:w-1/4"
      >
        <option value="">All Industries</option>
        {industries.map((ind) => (
          <option key={ind} value={ind}>{ind}</option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        className="border p-2 sm:p-3 rounded w-full md:w-1/4"
      >
        <option value="asc">Sort by Name: A → Z</option>
        <option value="desc">Sort by Name: Z → A</option>
      </select>
      
    </div>
  );
};

export default Filters;
