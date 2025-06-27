import { Avatar, Rating } from '@mantine/core';
import { IconQuote } from '@tabler/icons-react';
import { testimonials } from '../assets/assets';
import { assets } from '../assets/assets';

function Testimonials() {
  return (
    <div className='pb-20 bg-gradient-to-b from-gray-900 via-blue-950 to-gray-950'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-200'>
          What <span className='text-blue-400'>Users</span> Say About Us
        </h2>
        <p className='mt-3 text-gray-300 max-w-xl mx-auto'>Discover why our users love our platform through their experiences.</p>
      </div>

      <div className='mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
          {testimonials.map((customer, index) => (
            <div
              key={index}
              className='relative bg-gray-800/80 border border-blue-400/30 rounded-xl p-6 shadow-lg'
            >
              <IconQuote className='absolute top-3 right-3 opacity-30' width={24} height={24} stroke={1.5} color='#067cff' />
              <div className='flex items-center gap-3 mb-4'>
                <Avatar className='!h-12 !w-12 rounded-full border-2 border-blue-400' src={assets[`avatar_${index}`]} alt={customer.name} />
                <div>
                  <h3 className='text-base font-semibold text-gray-200'>{customer.name}</h3>
                  <Rating value={customer.rating} fractions={2} readOnly size='sm' />
                </div>
              </div>
              <p className='text-xs text-gray-300 leading-relaxed'>{customer.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
