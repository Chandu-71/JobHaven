import { assets } from "../assets/assets";


function AppDownload() {
  return (
    <div className="container px-4 2xl:px-20 mx-auto py-20">
      <div className="relative bg-black/50 p-12 sm:p-24 lg:p-32 rounded-lg">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-200 mb-8 max-w-md">Download Mobile App For Better Experience</h1>
          <div className="flex gap-4">
            <a href="" className="inline-block">
              <img className="h-12" src={assets.play_store} alt="" />
            </a>
            <a href="" className="inline-block">
              <img className="h-12"  src={assets.app_store} alt="" />
            </a>
          </div>
        </div>
        <img className="absolute w-100 right-0 bottom-0 mr-32 max-lg:hidden" src={assets.character_presenting_3} alt="" />        
      </div>
    </div>
  );
}

export default AppDownload;