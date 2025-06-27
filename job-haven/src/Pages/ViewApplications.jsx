import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Components/Loading';
import { IconDownload, IconDots, IconCheck, IconX } from '@tabler/icons-react';
import { Menu, ActionIcon } from '@mantine/core';

function ViewApplications() {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  // Function to fetch company job applicants' data
  const fetchCompanyJobApplicants = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', { headers: { token: companyToken } });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to update Job Applicaton status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status', { id, status }, { headers: { token: companyToken } });

      if (data.success) {
        fetchCompanyJobApplicants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplicants();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className='flex items-center justify-center h-[70vh]'>
        <p className='text-xl sm:text-2xl'>No Applications Available</p>
      </div>
    ) : (
      <div className='container mx-auto p-6 max-sm:p-4'>
        <div className='overflow-x-auto'>
          <table className='w-full max-w-4xl bg-white border-0 shadow-sm border-gray-200 max-sm:text-sm'>
            <thead>
              <tr className='bg-gray-100 border-b border-gray-300 [&_th]:py-3 [&_th]:px-6 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:max-sm:text-xs'>
                <th className='max-sm:hidden'>#</th>
                <th>User name</th>
                <th className='max-lg:hidden'>Job Title</th>
                <th className='max-lg:hidden'>Location</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants?.map((applicant, index) => (
                <tr
                  key={index}
                  className='text-gray-700 hover:bg-gray-50 border-b border-gray-200 last:border-b-0  [&_td]:px-6 [&_td]:py-3 [&_td]:text-left [&_td]:max-sm:text-xs'
                >
                  <td className='text-sm font-medium text-gray-500 max-sm:hidden'>{index + 1}</td>
                  <td className='text-left min-w-0 max-w-[120px] sm:max-w-none'>
                    <div className='flex items-center min-w-0'>
                      <img
                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 max-sm:hidden flex-shrink-0'
                        src={applicant.userId.image}
                        alt=''
                      />
                      <span className='truncate font-medium min-w-0'>{applicant.userId.name}</span>
                    </div>
                  </td>
                  <td className='max-lg:hidden'>{applicant.jobId.title}</td>
                  <td className='max-lg:hidden'>{applicant.jobId.location}</td>
                  <td>
                    <a
                      href={applicant.userId.resume}
                      target='_blank'
                      className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 font-medium items-center shadow-sm'
                    >
                      <span className='max-sm:hidden'>Resume</span> <IconDownload width={20} height={18} />
                    </a>
                  </td>
                  <td>
                    {applicant.status === 'Pending' ? (
                      <Menu shadow='md' width={150} position='bottom-end'>
                        <Menu.Target>
                          <ActionIcon variant='subtle' color='gray'>
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconCheck size={14} />}
                            color='blue'
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')}
                          >
                            Accept
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconX size={14} />}
                            color='red'
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')}
                          >
                            Reject
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    ) : (
                      <div>{applicant.status}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
}

export default ViewApplications;
