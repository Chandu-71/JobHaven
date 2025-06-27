import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { IconCirclesFilled, IconEraser, IconFilterFilled, IconMapPins, IconMenuDeep, IconMoodSad, IconTagsFilled, IconX } from '@tabler/icons-react';
import { Checkbox, Pagination } from '@mantine/core';
import { JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

function JobListing() {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = category => {
    setSelectedCategories(prev => (prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]));
  };

  const handleLocationChange = location => {
    setSelectedLocations(prev => (prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSearchFilter({ title: '', location: '' });
  };

  useEffect(() => {
    const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = job => searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job));

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className='conatiner px-5 2xl:pr-10 2xl:pl-5 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Sideabar */}
      <div className='w-full lg:min-w-[250px] lg:max-w-[330px] lg:min-h-[500px] bg-gray-900 2xl:border-r 2xl:border-gray-500 sm:pl-4 sm:mr-10'>
        <div className='mb-2 pb-3 border-b border-gray-600'>
          <div className='flex gap-2'>
            <IconFilterFilled className='text-blue-500' height={30} width={30} />
            <p className='text-2xl font-bold text-gray-200'>Job Filters</p>
          </div>
          <div className='flex justify-between items-center mt-3 mx-1'>
            <div
              onClick={e => setShowFilter(prev => !prev)}
              className='flex gap-1 text-white pl-2 pr-3 py-1 bg-gray-700 rounded-md text-sm cursor-pointer'
            >
              <IconMenuDeep width={20} height={23} />
              <p>{showFilter ? 'Close ' : 'Filters'}</p>
            </div>
            <div onClick={clearAllFilters} className='flex gap-2 justify-end mr-3 text-blue-400 cursor-pointer'>
              <IconEraser width={20} />
              <p>Clear All</p>
            </div>
          </div>
        </div>
        {/* Search filter from hero component */}
        <div className={showFilter ? '' : 'hidden'}>
          {isSearched && (searchFilter.title !== '' || searchFilter.location !== '') && (
            <div className='border-b border-gray-700'>
              <div className='flex gap-2 mb-1'>
                <IconCirclesFilled height={28} className='text-blue-400' />
                <h3 className='font-medium text-gray-300 text-lg'>Keyword Search</h3>
              </div>
              <div className='mb-4 text-gray-200 overflow-x-auto'>
                {searchFilter.title && (
                  <span className='inline-flex mt-2 mr-2 items-center gap-2.5 bg-blue-900/60 text-blue-100 px-2 py-1 rounded-full'>
                    {searchFilter.title}
                    <IconX onClick={e => setSearchFilter(s => ({ ...s, title: '' }))} size={16} stroke={2.7} className='cursor-pointer mt-0.5' />
                  </span>
                )}
                {searchFilter.location && (
                  <span className='mt-2 inline-flex items-center gap-2.5 bg-teal-900/60 text-teal-100 px-2 py-1 rounded-full'>
                    {searchFilter.location}
                    <IconX onClick={e => setSearchFilter(s => ({ ...s, location: '' }))} size={16} stroke={2.7} className='cursor-pointer mt-0.5' />
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className='pl-2'>
            <div className='border-b border-gray-700 py-3'>
              <div className='flex gap-2 py-4'>
                <IconTagsFilled className='text-blue-400' />
                <h4 className='font-medium text-gray-200 text-lg'>Job Categories</h4>
              </div>
              <ul className='space-y-4 text-gray-300'>
                {JobCategories.map((category, index) => (
                  <li key={index} className='flex items-center gap-2 mb-3'>
                    <Checkbox
                      label={category}
                      onChange={() => handleCategoryChange(category)}
                      checked={selectedCategories.includes(category)}
                      styles={{
                        label: { cursor: 'pointer' },
                        input: {
                          cursor: 'pointer',
                          backgroundColor: selectedCategories.includes(category) ? '#51a2ff' : 'transparent',
                          borderColor: selectedCategories.includes(category) ? '#51a2ff' : '#99a1af',
                        },
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Filter */}
            <div className='py-3'>
              <div className='flex gap-2 py-4'>
                <IconMapPins className='text-blue-400' />
                <h4 className='font-medium text-gray-200 text-lg'>Locations</h4>
              </div>
              <ul className='space-y-4 text-gray-300/90'>
                {JobLocations.map((location, index) => (
                  <li key={index} className='flex items-center gap-2 mb-3'>
                    <Checkbox
                      label={location}
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocations.includes(location)}
                      styles={{
                        label: { cursor: 'pointer' },
                        input: {
                          cursor: 'pointer',
                          backgroundColor: selectedLocations.includes(location) ? '#51a2ff' : 'transparent',
                          borderColor: selectedLocations.includes(location) ? '#51a2ff' : '#99a1af',
                        },
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <main className='flex-1'>
        <header className='mb-6'>
          <h1 className='text-2xl font-bold text-white'>Job Opportunities</h1>
          <p className='text-sm text-gray-400 mt-2'>
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </header>

        {filteredJobs.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>

            {filteredJobs.length > 6 && (
              <div className='mt-8 flex justify-center'>
                <Pagination total={Math.ceil(filteredJobs.length / 6)} value={currentPage} onChange={setCurrentPage} radius='md' color='blue' />
              </div>
            )}
          </>
        ) : (
          <div className='bg-gray-700/50 rounded-lg p-6 text-center'>
            <div className='max-w-md mx-auto'>
              <div className='flex justify-center text-gray-400 mb-4'>
                <IconMoodSad width={50} height={50} stroke={1.5} />
              </div>
              <h3 className='text-lg font-medium text-gray-300 mb-1'>No jobs found</h3>
              <p className='text-gray-400 text-sm mb-4'>Try adjusting your filters or search differently</p>
              <button
                onClick={clearAllFilters}
                className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md cursor-pointer'
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default JobListing;
