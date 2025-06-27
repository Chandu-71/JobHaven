import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';

function Subscribe() {
  return (
    <div className='mt-20 mx-15 py-3 flex items-center bg-[#314158] rounded-xl justify-around'>
      <div className='text-4xl w-2/5 text-center font-semibold text-[#e2e8f0] '>
        Never Wants to Miss Any <span className='text-[#067cff]'>Job News?</span>
      </div>
      <div className='flex gap-4 rounded-xl bg-[#45556c] px-3 py-2 items-center'>
        <TextInput className='[&_input]:!text-[#e2e8f0] font-semibold' variant="unstyled" placeholder='Your@email.com' size='xl' />
        <Button className='!rounded-lg' size='xl' variant='filled'>
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default Subscribe;
