import { useEffect, useState } from 'react';
import moment from 'moment';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { IconCloudUpload, IconEdit, IconEye, IconFileCv } from '@tabler/icons-react';
import axios from 'axios';

function Applications() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/users/update-resume', formData, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user && user.id) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <div className='container min-h-screen min-w-full bg-gradient-to-b from-gray-900 to-gray-950 px-4 2xl:px-20 py-10'>
      <div className='flex gap-2 text-gray-200'>
        <IconFileCv stroke={1.5} height={30} width={30} className='bg-gradient-to-r p-1 from-blue-500 to-purple-600 rounded-lg shadow-lg' />
        <h2 className='text-xl font-semibold'>Your Resume</h2>
      </div>
      <div className='flex gap-2 mb-13 mt-3'>
        {isEdit || (userData && userData.resume === '') ? (
          <>
            <label className='flex items-center cursor-pointer' htmlFor='resumeUpload'>
              <p className='bg-blue-200 text-blue-800 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : 'Select Resume'}</p>
              <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
              <IconCloudUpload height={40} width={40} className='bg-blue-500/90 p-2 rounded-xl text-gray-200' />
            </label>
            <button onClick={updateResume} className='bg-green-600 border border-green-400 rounded-lg px-4 py-2 text-green-100 cursor-pointer'>
              Save
            </button>
          </>
        ) : (
          userData &&
          userData.resume && (
            <div className='flex gap-2 text-gray-300'>
              <a target='_blank' href={userData.resume} className='bg-indigo-600/90 hover:bg-indigo-600/80 text-gray-200 px-4 py-2 rounded-lg'>
                <div className='flex gap-1'>
                  <IconEye height={25} width={25} />
                  View Resume
                </div>
              </a>
              <button onClick={e => setIsEdit(true)} className='text-gray-300 border border-gray-300 hover:bg-gray-800/50 rounded-lg pl-2 pr-4 py-2 cursor-pointer'>
                <div className='flex gap-1'>
                  <IconEdit />
                  Edit 
                </div>
              </button>
            </div>
          )
        )}
      </div>
      <h2 className='text-xl text-gray-200 font-semibold pb-4'>Jobs Applied</h2>
      <div className='bg-gradient-to-t from-gray-900 via-gray-900 to-gray-950 rounded-xl border border-gray-200 overflow-x-auto'>
        <table className='min-w-full'>
          <thead>
            <tr className='[&_th]:px-6 [&_th]:py-4 [&_th]:font-semibold tracking-wider text-gray-200 border-b border-gray-200 text-left '>
              <th>Company</th>
              <th>Job Title</th>
              <th className='max-sm:hidden'>Location</th>
              <th className='max-sm:hidden'>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {Array.isArray(userApplications) &&
              userApplications.map((job, index) => (
                <tr key={index} className='[&_td]:py-2 [&_td]:px-4 text-gray-200 hover:bg-blue-950/30 transition-colors duration-200'>
                  <td className='!py-3 flex items-center gap-2'>
                    <img className='w-8 h-8' src={job.companyId.image} alt='' />
                    {job.companyId.name}
                  </td>
                  <td>{job.jobId.title}</td>
                  <td className='max-sm:hidden'>{job.jobId.location}</td>
                  <td className='max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        job.status === 'Accepted'
                          ? 'bg-emerald-100/90 text-emerald-700/90 ring-1 ring-emerald-200/90'
                          : job.status === 'Rejected'
                          ? 'bg-red-100/90 text-red-700/90 ring-1 ring-red-200/90'
                          : 'bg-blue-100/90 text-blue-700/90 ring-1 ring-blue-200/90'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          job.status === 'Accepted' ? 'bg-emerald-500' : job.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      />
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Applications;
