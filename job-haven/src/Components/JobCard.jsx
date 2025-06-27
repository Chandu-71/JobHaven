import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconMapPin, IconTrendingUp, IconClock } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';

function JobCard({ job }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleApply = () => {
    navigate(`/apply-job/${job._id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      className='relative h-64 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Blurred Background Image */}
        <img src={job.companyId.image} className='w-full h-full object-cover scale-110 blur-sm brightness-75' />

        {/* Dark Overlay for readability */}
        <div className='absolute inset-0 bg-black/80'></div>
      </div>

      {/* Content Overlay */}
      <div className='relative h-full flex flex-col justify-between p-6 text-white'>
        {/* Header */}
        <div
          className={`flex items-start justify-between transition-all duration-500 ${isHovered ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}
        >
          <div className={`flex items-center gap-2 ${isHovered ? 'opacity-20' : 'opacity-100'}`}>
            <div className='w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center'>
              <img
                className='w-6 h-6 object-contain rounded '
                src={job.companyId.image}
                alt={`${job.companyId.name || 'Company'} logo`}
                onError={e => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className='text-sm font-medium text-white/90'>{job.companyId.name}</span>
          </div>
          <div className='flex items-center gap-1 text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm'>
            <IconClock size={10} />
            <span>{moment(job.date).fromNow()}</span>
          </div>
        </div>

        {/* Main Content - Default State */}
        <div
          className={`space-y-4 transition-all duration-500 ${
            isHovered ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}
        >
          <h3 className='text-xl font-bold leading-tight drop-shadow-lg'>{job.title}</h3>

          <div className='flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-1 bg-white/15 px-2 py-1 rounded-full backdrop-blur-sm'>
              <IconMapPin size={12} />
              <span>{job.location}</span>
            </div>
            <div className='flex items-center gap-1 bg-white/15 px-2 py-1 rounded-full backdrop-blur-sm'>
              <IconTrendingUp size={12} />
              <span>{job.level}</span>
            </div>
          </div>

          <Button
            onClick={handleApply}
            size='sm'
            className='bg-white text-black hover:bg-gray-100 font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl'
          >
            Apply Now
          </Button>
        </div>

        {/* Detailed Content - Hover State */}
        <div
          className={`absolute inset-6 flex flex-col justify-center space-y-4 transition-all duration-500 ${
            isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'
          }`}
        >
          <div className='space-y-3'>
            <h3 className='text-lg font-bold leading-tight drop-shadow-lg'>{job.title}</h3>

            <div className='flex items-center gap-4 text-xs'>
              <div className='flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm'>
                <IconMapPin size={10} />
                <span>{job.location}</span>
              </div>
              <div className='flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm'>
                <IconTrendingUp size={10} />
                <span>{job.level}</span>
              </div>
            </div>

            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3 max-h-24 overflow-y-auto'>
              <p
                className='rich-text text-xs'
                dangerouslySetInnerHTML={{
                  __html: job.description.substring(0, 200) + (job.description.length > 200 ? '...' : ''),
                }}
              />
            </div>

            <Button
              onClick={handleApply}
              size='sm'
              className='w-full bg-white text-black hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl'
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
