import DreamJob from '../LandingPage/DreamJob';
import Companies from '../LandingPage/Companies';
import JobCategory from '../LandingPage/JobCategory';
import Working from '../LandingPage/Working';
import Testimonials from '../LandingPage/Testimonials';
import Subscribe from '../LandingPage/Subscribe';

function LandingPage() {
  return (
    <div className='min-h-screen bg-gray-900 font-[Poppins]'>
      <DreamJob />
      <Companies />
      <JobCategory />
      {/* <Working /> */}
      <Testimonials />
      {/* <Subscribe /> */}
    </div>
  );
}

export default LandingPage;
