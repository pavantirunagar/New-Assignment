import React from 'react';
import { useCompanies } from '../hooks/useCompanies';
import Filters from '../components/filters';

const CompaniesList: React.FC = () => {
  const {
    companies,
    isLoading,
    error,
    search,
    setSearch,
    selectedLocation,
    setSelectedLocation,
    selectedIndustry,
    setSelectedIndustry,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    locations,
    industries,
  } = useCompanies();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading companies</p>;

  return (
    <div className="p-5">
      <Filters
        search={search}
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        locations={locations}
        industries={industries}
        setCurrentPage={setCurrentPage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies?.map((company) => (
          <div
            key={company.id}
            className="border p-4 sm:p-5 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-gray-600">{company.industry} | {company.location}</p>
            <p className="mt-2 text-gray-700">{company.description}</p>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 mt-2 block hover:underline"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>

      {companies?.length === 0 && (
           <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-500 text-lg mb-4">No companies found.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedLocation('');
              setSelectedIndustry('');
              setSortOrder('asc');
              setCurrentPage(1);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      )}

     {
        companies?.length !== 0 && (
             <div className="flex flex-wrap justify-center mt-5 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`border px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next  
        </button>
      </div> 
        )
     }
    </div>
  );
};

export default CompaniesList;
