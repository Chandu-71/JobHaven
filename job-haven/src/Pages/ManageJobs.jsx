import moment from 'moment';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loading from '../Components/Loading';

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    const { data } = await axios.get(backendUrl + '/api/company/list-jobs', { headers: { token: companyToken } });

    if (data.success) {
      setJobs(data.jobsData.reverse());
      console.log(data.jobsData);
    } else {
      toast.error(data.message);
    }
  };

  // Function to change Job visibility
  const changeJobVisibility = async id => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visibility', { id }, { headers: { token: companyToken } });

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>No Jobs Available or posted</p>
      </div>
    ) : (
      <div className='container p-6 max-sm:p-4 max-w-5xl'>
        <div className='overflow-x-auto w-full shadow'>
          <table className='w-full bg-white shadow-sm border border-gray-100 text-sm'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-left text-xs sm:text-sm hidden sm:table-cell'>#</th>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-left text-xs sm:text-sm'>Job Title</th>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-left text-xs sm:text-sm hidden md:table-cell'>
                  Date
                </th>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-left text-xs sm:text-sm'>Location</th>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-center text-xs sm:text-sm'>Apps</th>
                <th className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 font-semibold text-gray-900 text-center text-xs sm:text-sm'>Visible</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {jobs.map((job, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors duration-150'>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm font-medium text-gray-500 hidden sm:table-cell'>{index + 1}</td>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm lg:text-base font-semibold text-gray-900'>
                    <div className='truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none' title={job.title}>
                      {job.title}
                    </div>
                    {/* Show date on mobile below title */}
                    <div className='text-xs text-gray-500 md:hidden mt-1'>{moment(job.date).format('MMM DD, YYYY')}</div>
                  </td>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-600 hidden md:table-cell'>
                    {moment(job.date).format('MMM DD, YYYY')}
                  </td>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-600'>
                    <div className='truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none' title={job.location}>
                      {job.location}
                    </div>
                  </td>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-center'>
                    <span className='inline-flex items-center justify-center w-6 h-5 sm:w-8 sm:h-6 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full'>
                      {job.applicants}
                    </span>
                  </td>
                  <td className='py-3 px-2 sm:py-4 sm:px-4 lg:px-6 text-center'>
                    <input onChange={() => changeJobVisibility(job._id)} className='scale-110 sm:scale-125' type='checkbox' checked={job.visible} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-4 flex justify-end'>
          <button onClick={() => navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded cursor-pointer'>
            Add new job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
}

export default ManageJobs;
