import { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconBuildingSkyscraper, IconMail, IconLockPassword, IconX } from '@tabler/icons-react';

function RecruiterLogin() {
  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

  const navigate = useNavigate();

  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [image, setImage] = useState(null);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const onSubmitHandler = async e => {
    e.preventDefault();

    if (state === 'Sign Up' && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/company/login', { email, password });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        const { data } = await axios.post(backendUrl + '/api/company/register', formData);

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (state === 'Login') {
      setEmail('google@demo.com');
      setPassword('1234567');
    } else {
      setEmail('');
      setPassword('');
    }
  }, [state]);

  return (
    <div className='absolute top-0 bottom-0 right-0 left-0 z-1 backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white/80 pt-10 pb-3 px-2 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-gray-950 font-medium'>Recruiter {state}</h1>
        <p className='text-sm text-center text-gray-700'>Welcome back! Please sign in to continue</p>
        <div className='bg-gray-100 p-3 rounded-xl mt-5 w-xs'>
          {state === 'Sign Up' && isTextDataSubmitted ? (
            <>
              <div className='flex gap-4 items-center my-10'>
                <label className='flex gap-4 items-center cursor-pointer' htmlFor='image'>
                  <img className='w-16 rounded-full border' src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                  <input onChange={e => setImage(e.target.files[0])} type='file' id='image' hidden />
                  <p className='text-gray-800'>
                    Upload Company <br />
                    logo
                  </p>
                </label>
              </div>
            </>
          ) : (
            <div className='flex flex-col gap-2'>
              {state !== 'Login' && (
                <div className='border border-gray-300 bg-white px-4 py-2 flex items-center gap-2 rounded-2xl'>
                  <IconBuildingSkyscraper width={20} stroke={1.5} />
                  <input
                    className='outline-none text-sm text-gray-800'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type='text'
                    placeholder='Company Name'
                    required
                  />
                </div>
              )}
              <div className='border border-gray-300 bg-white px-4 py-2 flex items-center gap-2 rounded-2xl'>
                <IconMail width={20} stroke={1.5} />
                <input
                  className='outline-none text-sm text-gray-800'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  type='email'
                  placeholder='Email Address'
                  required
                />
              </div>
              <div className='border border-gray-300 bg-white px-4 py-2 flex items-center gap-2 rounded-2xl'>
                <IconLockPassword width={20} stroke={1.5} />
                <input
                  className='outline-none text-sm text-gray-800'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  type='password'
                  placeholder='Password'
                  required
                />
              </div>
            </div>
          )}

          {state === 'Login' && <p className='text-sm text-blue-500 mt-1 cursor'>Forgot Password?</p>}
          <button type='submit' className='bg-blue-600 w-full py-2 mt-5 rounded-2xl text-white cursor-pointer'>
            {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'next'}
          </button>
        </div>

        <IconX onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' />
      </form>
      {state === 'Login' ? (
        <p className='mt-5 text-center text-gray-300'>
          Don't have an account?{' '}
          <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>
            Sign Up
          </span>
        </p>
      ) : (
        <p className='mt-5 text-center text-gray-300'>
          Already have an account?{' '}
          <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>
            Login
          </span>
        </p>
      )}
    </div>
  );
}

export default RecruiterLogin;
