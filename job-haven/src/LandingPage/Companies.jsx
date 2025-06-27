import { companiesNames } from '../assets/assets';
import Marquee from 'react-fast-marquee';

function Companies() {
  return (
    <div className='mt-12 pb-5'>
      <div className='text-4xl max-sm:text-3xl text-center font-semibold text-gray-200 mb-5'>
        Trusted By <span className='text-blue-400'>1000+</span> Companies
      </div>
      <Marquee pauseOnHover={true} className='h-22'>
        {companiesNames.map((company, index) => (
          <div key={index} className='mx-6 px-4 rounded-xl cursor-pointer'>
            <img className='h-14 hover:scale-150 duration-200' src={`/Companies/${company}.png`} alt={`${company} logo`} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Companies;
