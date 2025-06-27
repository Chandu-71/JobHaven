import { assets } from "../assets/assets";

function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center'>
      <div className="text-center">
        {/* Logo/Brand Area */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-950 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <img className="w-13" src={assets.Mylogo} alt="logo" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">JobFinder</h2>
        </div>

        <div className="ml-3 mb-4">
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded animate-ping"></div>
          <div className="w-2 h-2 bg-blue-600 rounded animate-ping" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded animate-ping" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;