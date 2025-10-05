import { useState, useMemo, useEffect } from 'react';
import { useGetCompaniesQuery, Company } from '../services/companiesApi';

export const useCompanies = () => {
  const { data: companies = [], isLoading, error } = useGetCompaniesQuery(); 

  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company: Company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
        const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;
        return matchesSearch && matchesLocation && matchesIndustry;
      })
      .sort((a: Company, b: Company) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  }, [companies, search, selectedLocation, selectedIndustry, sortOrder]);

  const totalItems = filteredCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages]);

  const locations = Array.from(new Set(companies.map((c) => c.location)));
  const industries = Array.from(new Set(companies.map((c) => c.industry)));

  const resetFilters = () => {
    setSearch('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSortOrder('asc');
    setCurrentPage(1);
  };

  return {
    companies: paginatedCompanies,
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
    resetFilters,
  };
};
