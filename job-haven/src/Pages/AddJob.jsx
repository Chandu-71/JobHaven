import { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AddJob() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Entry Level (0-2 years)');
  const [salary, setSalary] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async e => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, location, category, level, salary, description },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSalary('');
        if (quillRef.current) {
          quillRef.current.setText('');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        placeholder: 'Describe the role, responsibilities, requirements, and what makes this opportunity unique...',
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className='px-4 py-8 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900 mb-1'>Create Job Posting</h1>
        <p className=' text-gray-600'>Attract top talent by creating a compelling job posting that stands out</p>
      </div>

      <div className='bg-white/80 rounded-2xl shadow-md border border-white/20 p-8 max-sm:p-4 '>
        {/* Form Card */}
        <form onSubmit={onSubmitHandler} className='space-y-7'>
          {/* Job Title Section */}
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='w-1 h-7 bg-gradient-to-b from-blue-500 to-indigo-600 rounded'></div>
              <label className='text-lg font-semibold text-gray-900'>Job Title *</label>
            </div>
            <input
              type='text'
              placeholder='e.g. Senior Full Stack Developer'
              onChange={e => setTitle(e.target.value)}
              value={title}
              required
              className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white/70'
            />
          </div>

          {/* Job Description Section */}
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-600 rounded'></div>
              <label className='text-lg font-semibold text-gray-900'>Job Description *</label>
            </div>
            <div className='bg-white/70 border-1 border-gray-200'>
              <div ref={editorRef} className='min-h-[250px]'></div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='w-1 h-7 bg-gradient-to-b from-purple-500 to-pink-600 rounded'></div>
              <h3 className='text-lg font-semibold text-gray-900'>Job Details</h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Category</label>
                <select
                  className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white/70 cursor-pointer'
                  onChange={e => setCategory(e.target.value)}
                  value={category}
                >
                  {JobCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>Location</label>
                <select
                  className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white/70 cursor-pointer'
                  onChange={e => setLocation(e.target.value)}
                  value={location}
                >
                  {JobLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className='space-y-2 sm:col-span-2 lg:col-span-1'>
                <label className='block text-sm font-medium text-gray-700'>Experience Level</label>
                <select
                  className='w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white/70 cursor-pointer'
                  onChange={e => setLevel(e.target.value)}
                  value={level}
                >
                  <option value='Beginner Level'>Entry Level (0-2 years)</option>
                  <option value='Intermediate Level'>Mid Level (3-5 years)</option>
                  <option value='Senior Level'>Senior Level (5+ years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Salary Section */}
          <div className='space-y-2'>
            <div className='flex items-center gap-3'>
              <div className='w-1 h-7 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full'></div>
              <label className='text-lg font-semibold text-gray-900'>Compensation</label>
            </div>

            <div className='space-y-2 max-w-[250px]'>
              <label className='block text-sm font-medium text-gray-700'>Salary</label>
              <input
                type='number'
                min={0}
                placeholder='75,000'
                onChange={e => setSalary(e.target.value)}
                value={salary}
                className='w-full px-4 py-2 text-lg border-2 border-gray-200 rounded-lg bg-white/70'
              />
            </div>
          </div>
          <hr className='text-gray-400' />
          <div className='flex justify-end'>
            <button type='submit' className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer'>
              Publish Job Posting
            </button>
          </div>
        </form>
      </div>
      {/* Footer */}
      <div className='text-center mt-8 text-gray-500'>
        Need help? Check our{' '}
        <a className='text-blue-600 hover:text-blue-700' href='#'>
          posting guidelines
        </a>
      </div>
    </div>
  );
}

export default AddJob;
