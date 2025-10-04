import { useState, useMemo } from 'react';
import { useGetCompaniesQuery } from '../services/companiesApi';

export const useCompanies = () => {
  const { data: companies, isLoading, error } = useGetCompaniesQuery();
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCompanies = useMemo(() => {
    return companies
      ?.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
        const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;
        return matchesSearch && matchesLocation && matchesIndustry;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
  }, [companies, search, selectedLocation, selectedIndustry, sortOrder]);

  const totalItems = filteredCompanies?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCompanies = filteredCompanies?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const locations = Array.from(new Set(companies?.map((c) => c.location) || []));
  const industries = Array.from(new Set(companies?.map((c) => c.industry) || []));

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
  };
};
