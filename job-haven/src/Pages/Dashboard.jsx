import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { IconClipboardList, IconSquarePlus, IconUserCheck } from '@tabler/icons-react';

function Dashboard() {
  const navigate = useNavigate();
  const { companyData } = useContext(AppContext);
  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs');
    }
  }, [companyData]);

  return (
    <div className='flex items-start'>
      {/* Left sidebar with option to add job, manage jobs, view applications */}
      <div className='inline-block min-h-screen border-r-2 border-gray-300 md:min-w-52'>
        <ul className='flex flex-col items-start pt-5 text-gray-800'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
            }
            to='/dashboard/add-job'
          >
            <IconSquarePlus />
            <p className='max-md:hidden'>Add Job</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
            }
            to='/dashboard/manage-jobs'
          >
            <IconClipboardList />
            <p className='max-md:hidden'>Manage Jobs</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`
            }
            to='/dashboard/view-applications'
          >
            <IconUserCheck/>
            <p className='max-md:hidden'>View Applications</p>
          </NavLink>
        </ul>
      </div>

      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
