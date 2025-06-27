import { useContext, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { IconMapPin, IconSearch } from '@tabler/icons-react';

function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value.trim(),
      location: locationRef.current.value.trim(),
    });
    setIsSearched(true);
    console.log('Search initiated with:', {
      title: titleRef.current.value.trim(),
      location: locationRef.current.value.trim(),
    });
  };

  return (
    <div className='relative'>
      {/* Top blend */}
      <div className='absolute top-0 left-0 right-0 h-15 bg-gradient-to-b from-gray-900 to-transparent z-1'></div>

      <div
        className='text-white py-30 max-sm:py-20 text-center relative bg-center bg-cover'
        style={{ backgroundImage: 'url("/gener-banner-2.png")', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <div className='relative z-10 sm:px-50'>
          <h2 className='text-[22px] sm:text-3xl lg:text-4xl font-bold mb-4'>
            Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 drop-shadow-lg'>Dream Job</span> is Just a Click Away
          </h2>

          <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5 text-gray-200'>
            From startups to global giants, we’ve got roles that match your vibe. Browse, apply, and get hired — it’s that simple.
          </p>

          <div className='flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-xl text-slate-500 max-w-xl pl-4 mx-4 sm:mx-auto shadow-xl border border-white/20'>
            <div className='flex items-center'>
              <IconSearch className='h-4 sm:h-5 text-blue-500' />
              <input
                type='text'
                placeholder='Search for jobs'
                className='max-sm:text-xs p-2 rounded outline-none w-full max-sm:placeholder:text-sm placeholder:text-gray-400 focus:placeholder:text-gray-300 transition-colors'
                ref={titleRef}
              />
            </div>
            <div className='flex items-center border-l border-gray-200 pl-3'>
              <IconMapPin className='h-4 sm:h-5 text-blue-500' />
              <input
                type='text'
                placeholder='Location'
                className='max-sm:text-xs p-2 rounded outline-none w-full max-sm:placeholder:text-sm placeholder:text-gray-400 focus:placeholder:text-gray-300 transition-colors'
                ref={locationRef}
              />
            </div>
            <button
              onClick={onSearch}
              className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2 rounded-lg m-1 text-white cursor-pointer transition-all duration-200 transform hover:scale-105'
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Bottom blend */}
      <div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900 to-transparent z-1'></div>
    </div>
  );
}

export default Hero;
