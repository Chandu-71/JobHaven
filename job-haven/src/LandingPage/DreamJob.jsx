import { Avatar } from '@mantine/core';
import { assets } from '../assets/assets';
import { IconMapPin, IconClock, IconUsers } from '@tabler/icons-react';

function DreamJob() {
  return (
    <div className='flex max-lg:flex-col items-center px-16 pt-5'>
      <div className='flex flex-col gap-25 max-sm:gap-15'>
        <div>
          <div className='text-6xl sm:text-7xl font-bold text-white leading-tight'>
            Land your <span className='bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>dream job</span> with
            <span className='font-normal'> Job</span>
            <span className='font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Haven</span>
          </div>
          <div className='text-lg mt-3 text-gray-300'>Thousands of curated jobs, zero clutter. Simple, fast, and focused on what matters.</div>
        </div>
        <div className='flex gap-8 text-gray-300'>
          <div>
            <h3 className='text-4xl max-sm:text-3xl font-bold'>1,200+</h3>
            <p className='text-sm text-gray-400'>Jobs Available</p>
          </div>
          <div>
            <h3 className='text-4xl max-sm:text-3xl font-bold'>300+</h3>
            <p className='text-sm text-gray-400'>Companies Hiring</p>
          </div>
          <div>
            <h3 className='text-4xl max-sm:text-3xl font-bold'>5,000+</h3>
            <p className='text-sm text-gray-400'>Applications Submitted</p>
          </div>
        </div>
      </div>

      <div className='w-200 max-lg:max-w-dvw mt-5 relative flex justify-center'>
        <img src={assets.working_man_9} alt='man with a laptop' />

        <div className='absolute top-[50%] right-10 max-sm:right-2 w-fit border-2 border-sky-700 rounded-lg p-3 backdrop-blur-md'>
          <div className='text-center text-sm text-gray-200'>10k+ got job</div>
          <Avatar.Group>
            <Avatar src={assets.avatar_2} />
            <Avatar src={assets.avatar_3} />
            <Avatar src={assets.avatar_4} />
            <Avatar>+10k</Avatar>
          </Avatar.Group>
        </div>

        <div className='absolute top-[27%] -left-7 w-fit max-sm:left-2 max-sm:top-30 border-2 border-sky-700 rounded-lg p-3 max-sm:p-1.5 backdrop-blur-md animate'>
          <div className='flex gap-2 max-sm:gap-1 items-center'>
            <div className='w-12 max-sm:w-10 p-1 rounded-lg'>
              <img src='/Google.png' alt='google logo' />
            </div>
            <div className='text-sm text-gray-200'>
              <div>Software Engineer</div>
              <div className='flex gap-1'>
                <IconMapPin width={12} height={15} color='oklch(0.828 0.189 84.429)' stroke={1.5} />
                <div className='text-gray-300 text-xs'>New York</div>
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-around mt-2 text-xs text-gray-300'>
            <div className='flex gap-1'>
              <IconClock width={12} height={16} stroke={2} />
              <span>1 day ago</span>
            </div>
            <div className='flex gap-1'>
              <IconUsers width={12} height={16} stroke={2} />
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DreamJob;
