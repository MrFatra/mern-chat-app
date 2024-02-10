import React from 'react';
import { FaArrowRight, FaDoorOpen } from 'react-icons/fa6';
import { useAuthContext } from '../context/Auth';

const Home = () => {
  const { authUser } = useAuthContext()

  return (
    <div className='flex items-center min-h-screen flex-col justify-center px-5'>
      <p className='text-3xl font-bold'>Whello!</p>
      <h1 className='text-2xl font-semibold'>Welcome to my project.</h1>
      <img src="/assets/images/petrik_makan.gif" alt="" className='my-10 w-1/2 md:w-1/3 lg:w-1/3' />
      <p className='font-medium text-xs'>this is my project about side to side user chatting using socket.io and nodeJS as backend server.</p>
      <p className='text-lg font-semibold'>Start your conversation with your friend now! 👌</p>
      <div className={authUser ? 'flex flex-col gap-5 my-5' : 'flex gap-5 my-5'}>
        {
          authUser
            ?
            <>
              <a href='/login' className='flex items-center gap-5 btn rounded-full btn-primary hover:text-white text-primary hover:border-1 hover:border-primary hover:bg-primary bg-transparent'>
                Go to Chats
                <FaArrowRight size={18} />
              </a>
              <div className="flex">
                <p className='font-medium text-lg text-white text-opacity-25'>Logged in as: {authUser.data.fullName}</p>
              </div>
            </>
            :
            <>
              <a href='/signup' className='flex items-center gap-5 btn rounded-full btn-primary btn-success text-white'>
                Sign Up
                <FaDoorOpen size={18} />
              </a>
              <a href='/login' className='flex items-center gap-5 btn rounded-full btn-primary hover:text-white text-primary hover:border-1 hover:border-primary hover:bg-primary bg-transparent'>
                Login
                <FaArrowRight size={18} />
              </a>
            </>
        }
      </div>
    </div>
  );
};

export default Home;
