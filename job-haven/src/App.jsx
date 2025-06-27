import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { useContext } from 'react';

import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import ApplyJobs from './Pages/ApplyJobs';
import Applications from './Pages/Applications';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Loading from './Components/Loading';
import RecruiterLogin from './LandingPage/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './Pages/Dashboard';
import AddJob from './Pages/AddJob';
import ViewApplications from './Pages/ViewApplications';
import ManageJobs from './Pages/ManageJobs';
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }
  if (!isSignedIn) {
    return <Navigate to='/' replace />;
  }

  return children;
}

function RecruiterProtectedRoute({ children }) {
  const { companyToken, loadingCompanyToken } = useContext(AppContext);

  if (loadingCompanyToken) {
    return <Loading />; // wait until token is checked
  }

  if (!companyToken) {
    return <Navigate to='/' replace />;
  }

  return children;
}

function App() {
  const { isSignedIn } = useUser();
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <MantineProvider>
      <BrowserRouter>
        {showRecruiterLogin && <RecruiterLogin />}
        <ToastContainer />
        <Header />
        <div className='min-h-[127vh] flex flex-col'>
          <main className='flex-1'>
            <Routes>
              {/* Public route */}
              <Route path='/' element={companyToken ? <Navigate to='/dashboard' replace /> : isSignedIn ? <Home /> : <LandingPage />} />

              {/* Protected routes */}
              <Route
                path='/apply-job/:id'
                element={
                  <ProtectedRoute>
                    <ApplyJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/applications'
                element={
                  <ProtectedRoute>
                    <Applications />
                  </ProtectedRoute>
                }
              />

              {/* Recruiter routes */}
              <Route
                path='/dashboard'
                element={
                  <RecruiterProtectedRoute>
                    <Dashboard />
                  </RecruiterProtectedRoute>
                }
              >
                <Route path='add-job' element={<AddJob />} />
                <Route path='manage-jobs' element={<ManageJobs />} />
                <Route path='view-applications' element={<ViewApplications />} />
              </Route>

              {/* Catch-all route */}
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
