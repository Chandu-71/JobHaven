import Hero from '../Components/Hero';
import JobListing from '../Components/JobListing';
import AppDownload from '../Components/AppDownload';

function Home() {
  return (
    <div className='bg-gray-900'>
      <Hero />
      <JobListing />
      <AppDownload />
    </div>
  );
}

export default Home;
