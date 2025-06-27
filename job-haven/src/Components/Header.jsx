import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { HoverCard } from '@mantine/core';

function Header() {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const { setShowRecruiterLogin, companyToken, setCompanyToken, companyData, setCompanyData } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className='w-full h-18 text-white flex items-center justify-between px-6 2xl:px-16 bg-gray-900 font-[Poppins]'>
      <Link to='/' className='flex gap-1 items-center'>
        <img src={assets.Mylogo} alt='logo' width='40px' />
        <div className='text-3xl max-sm:text-xl text-gray-200'>
          Job<span className='font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Haven</span>
        </div>
      </Link>

      {user ? (
        <div className='flex items-center gap-4 max-sm:gap-2 bg-gray-800/60 px-4 py-2 rounded-2xl shadow-sm backdrop-blur-md border border-gray-700'>
          <Link
            to='/applications'
            className='text-[17px] max-sm:text-xs font-semibold text-transparent bg-clip-text bg-gray-200 hover:bg-gradient-to-r hover:from-cyan-300 hover:to-blue-500 transition-colors duration-200'
          >
            View Applied Jobs
          </Link>

          <div className='h-5 w-px bg-gray-600' />

          <p className='hidden sm:block text-gray-400 text-sm italic'>
            Hi, <span className='text-white text-[16px] font-semibold not-italic'>{user.fullName}</span>
          </p>

          <UserButton />
        </div>
      ) : companyToken ? (
        <div className='flex flex-row-reverse gap-3 items-center'>
          <p className='max-sm:hidden'>Welcome, {companyData?.name}</p>
          <HoverCard shadow='md' openDelay={200} closeDelay={400}>
            <HoverCard.Target>
              <img className='w-8 bg-white object-cover border border-gray-400 rounded-full cursor-pointer' src={companyData?.image} alt='' />
            </HoverCard.Target>
            <HoverCard.Dropdown className='!mt-1.5 !py-2.5 !pr-10 !rounded-md !border !border-gray-300'>
              <p
                className='text-sm hover:text-red-800 cursor-pointer transition'
                onClick={() => {
                  localStorage.removeItem('companyToken');
                  setCompanyToken(null);
                  setCompanyData(null);
                  navigate('/');
                }}
              >
                Logout
              </p>
            </HoverCard.Dropdown>
          </HoverCard>
          {/* <div className='sm:hidden border py-1.5 px-2 border-red-400 rounded ml-2'>
            <button
              onClick={() => {
                localStorage.removeItem('companyToken');
                setCompanyToken(null);
                setCompanyData(null);
                navigate('/');
              }}
              className='text-sm text-red-400'
            >
              Logout
            </button>
          </div> */}
        </div>
      ) : (
        <div className='flex gap-4 max-sm:gap-2 max-sm:text-xs'>
          <button
            onClick={e => setShowRecruiterLogin(true)}
            className='text-slate-200 px-2 sm:px-9 py-2 cursor-pointer border-2 rounded-lg border-sky-600 hover:bg-sky-700 hover:border-sky-700 transition-all duration-200'
          >
            Recruiter Login
          </button>
          <button
            onClick={e => openSignIn()}
            className='bg-sky-600 text-slate-100 px-4 sm:px-9 py-2 rounded-lg cursor-pointer hover:bg-sky-700 transition-all duration-200'
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
