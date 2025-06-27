import { miniJobCategory } from '../assets/assets';
import { Carousel } from '@mantine/carousel';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

function JobCategory() {
  return (
    <div className='my-12 pb-5'>
      <div className='text-4xl max-sm:text-3xl text-center font-semibold text-gray-200 mb-3'>
        Browse <span className='text-blue-400'>Job</span> Category
      </div>
      <div className='text-lg max-sm:text-sm mb-10 max-sm:mb-5 mx-auto w-2/3 text-center text-[#cad5e2]'>
        Explore diverse job opportunities tailored to your skills. start your career journey today!
      </div>

      <Carousel
        slideSize='21%'
        slideGap='sm'
        className='[&_button]:!bg-blue-300 [&_button]:!border-none [&_button]:!opacity-20 [&_button]:max-sm:!opacity-100 [&_button]:transition-opacity hover:[&_button]:!opacity-100'
        emblaOptions={{ loop: true }}
        nextControlIcon={<IconChevronRight />}
        previousControlIcon={<IconChevronLeft />}
      >
        {miniJobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div
              className='group flex flex-col items-center w-64 gap-2 bg-gradient-to-br from-gray-200/7 via-gray-100/10 border border-blue-300/30 
              pt-6 px-6 pb-4 rounded-2xl cursor-pointer mt-2 mb-8 hover:shadow-blue-400/30 hover:shadow-md transition-all ease-in-out duration-300 
              hover:scale-105'
            >
              <div className='p-2 bg-blue-400/90 rounded-full'>
                <img className='h-8 w-8' src={`Category/${category.name}.png`} alt={category.name} />
              </div>
              <div className='text-gray-200 text-xl font-semibold'>{category.name}</div>
              <div className='text-sm text-center text-gray-300'>{category.description}</div>
              <div className='group-hover:bg-blue-400/30 transition text-gray-300 mt-1 text-md border rounded-full pt-1 px-3 bg-gray-400/20 border-gray-300/20'>
                <span className='text-blue-400 text-lg'>{category.jobs}K+ </span>job posted
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default JobCategory;
