import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../Components/JobCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { IconBriefcase, IconCurrencyRupee, IconMapPin, IconUserUp } from '@tabler/icons-react';

function ApplyJobs() {
  const { id } = useParams();

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const [JobData, setJobData] = useState(null);

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for a job');
      }
      if (!userData.resume) {
        navigate('/applications');
        return toast.error('Upload your resume to apply');
      }

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/users/apply', { jobId: JobData._id }, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some( item => item.jobId._id === JobData._id);

    setIsAlreadyApplied(hasApplied);
  }

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if(userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [JobData, userApplications, id]);

  return JobData ? (
    <>
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto bg-gradient-to-b from-gray-900 to-gray-950'>
        <div className='text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 max-sm:py-10 mb-6 bg-[#191970]/30 border border-gray-500 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border border-gray-200' src={JobData.companyId.image} alt='' />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl sm:text-4xl font-medium text-gray-100'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-3'>
                  <span className='flex items-center gap-1 text-gray-300'>
                    <IconBriefcase size={20}/>
                    {JobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1 text-gray-300'>
                    <IconMapPin size={20}/>
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-1 text-gray-300'>
                    <IconUserUp size={20}/>
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-1 text-gray-300'>
                    <IconCurrencyRupee size={20}/>
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center '>
              <button onClick={applyHandler} className='bg-sky-600 hover:bg-sky-600/80 p-2.5 px-10 text-white rounded cursor-pointer'>
                {isAlreadyApplied ? "Already Applied" : "Apply Now"  }
              </button>
              <p className='mt-2 text-gray-300'>Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full mt-5 lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>Job description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button onClick={applyHandler} className='bg-sky-600/90 hover:bg-sky-600/80 p-2.5 px-10 text-white rounded mt-10 cursor-pointer'>
                {isAlreadyApplied ? "Already Applied" : "Apply Now"  }
              </button>
            </div>
            {/* right side more jobs */}
            <div className='w-full mt-10 bg-gray-900 p-5 lg:w-1/3 lg:ml-4 lg:pt-2 lg:p-8 space-y-5 rounded-xl'>
              <h2 className='font-semibold text-xl mt-2'>More Jobs from {JobData.companyId.name}</h2>
              {jobs
                .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .filter(job => {
                  // Set of applied jobIds
                  const appliedJobIds = new Set(userApplications.map(item => item.jobId && item.jobId._id));
                  // Return true if the user has not applied for this job
                  return !appliedJobIds.has(job._id);
                })
                .reverse()
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default ApplyJobs;
