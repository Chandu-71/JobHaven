

function Footer() {
  return (
    <div className='flex flex-col bg-gray-950 text-white'>
      <div className='flex text-center sm:text-start max-sm:flex-col'>
        <div className='flex-1 flex flex-col gap-2 px-2 sm:px-16 pt-12 sm:py-10'>
          <span className='sm:text-xs md:text-base font-medium'>About JobHaven</span>
          <a className='sm:text-xs md:text-base hover:text-blue-400 hover:translate-x-1 transition duration-300 ease-in-out' href='/'>
            Home
          </a>
        </div>
        <div className='flex-1 flex flex-col gap-2 px-2 sm:px-8 pt-8 sm:pb-8'>
          <span className='sm:text-xs md:text-base font-medium'>Legal</span>{' '}
          <a className='sm:text-xs md:text-base hover:text-blue-400 hover:translate-x-1 transition duration-300 ease-in-out' href='#'>
            Terms of Service
          </a>
          <a className='sm:text-xs md:text-base hover:text-blue-400 hover:translate-x-1 transition duration-300 ease-in-out' href='#'>
            Privacy Policy
          </a>
        </div>
        <div className='flex-1 flex flex-col gap-2 px-2 sm:px-8 py-8'>
          <span className='sm:text-xs md:text-base font-medium'>Follow Us</span>
          <a className='sm:text-xs md:text-base hover:text-blue-400 hover:translate-x-1 transition duration-300 ease-in-out' href='https://www.linkedin.com/in/chandu-tiruvayeepati-44b518286/' target='_blank'>
            LinkedIn
          </a>
          <a className='sm:text-xs md:text-base hover:text-blue-400 hover:translate-x-1 transition duration-300 ease-in-out' href='https://x.com/Chandu_X7' target='_blank'>
            X (Twitter)
          </a>
        </div>
      </div>
      <div className='relative pb-4'>
        <div className='absolute w-px left-0 top-0 bottom-2 bg-agro-600/50'></div>
        <span className='px-10 text-xs'>© JobHaven 2025</span>
        <div className='absolute w-px right-0 top-0 bottom-2 bg-agro-600/50'></div>
      </div>
    </div>
  );
}



// old footer component

// import { IconBrandInstagram, IconBrandX, IconBrandYoutube } from '@tabler/icons-react';
// import { footerLinks } from '../Data/Data';
// function Footer() {
//   return (
//     <div classNameName='pt-15 pb-5 flex gap-5 justify-around bg-[#1d293d] font-[Poppins]'>
//       <div classNameName='w-1/4 flex flex-col gap-4 max-sm:hidden'>
//         <div classNameName='flex gap-1 items-center text-blue-400'>
//           <img src='logo.svg' alt='logo' width='24px' />
//           <div classNameName='text-xl font-semibold'>JobFinder</div>
//         </div>
//         <div classNameName='text-sm text-[#cad5e2]'>
//           Job portal with user profiles, skill updates, certifications, work experience and admin job postings.
//         </div>
//         <div classNameName='flex gap-3 text-[#e2e8f0] [&>div]:bg-slate-700 [&>div]:rounded-full [&>div]:p-2 [&>div]:cursor-pointer [&>div]:hover:bg-slate-600'>
//           <div>
//             <IconBrandInstagram />
//           </div>
//           <div>
//             <IconBrandX />
//           </div>
//           <div>
//             <IconBrandYoutube />
//           </div>
//         </div>
//       </div>

//       {footerLinks.map((item, index) => (
//         <div key={index} classNameName=''>
//           <div classNameName='text-lg font-semibold mb-4 text-blue-400'>{item.title}</div>
//           {item.links.map((link, idx) => (
//             <div
//               key={idx}
//               classNameName='text-sm text-slate-300 hover:text-blue-400 cursor-pointer mb-1 hover:translate-x-1 transition duration-300 ease-in-out'
//             >
//               {link}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

export default Footer;
