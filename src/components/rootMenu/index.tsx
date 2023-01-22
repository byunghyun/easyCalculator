'use client';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootMenu = () => {
  const handleClickEvent = {
    test: () => {
      toast.error('서비스 예정입니다.');
    },
  };
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <ToastContainer />
      <h1 className='text-[32px] text-gray-700 text-center font-semibold'>
        직장인 히어로
      </h1>
      <ul className='flex-1 pt-[30px]'>
        <li className='border-[1px] text-center text-gray-500 hover:text-primary-medium hover:border-primary-medium border-gray-400  mb-[12px] last:mb-0 rounded-[10px]'>
          <Link href='youth-income' className='block w-full h-full p-[15px]'>
            중소기업 취업청년 소득세감면 서류 가이드
          </Link>
        </li>
        <li className='border-[1px] text-center text-gray-500 hover:text-primary-medium hover:border-primary-medium border-gray-400  mb-[12px] last:mb-0 rounded-[10px]'>
          <button
            onClick={handleClickEvent.test}
            className='block w-full h-full p-[15px]'
          >
            퇴사일 D-Day (주말, 연차 제외 가능)
          </button>
        </li>
      </ul>
    </div>
  );
};

export default RootMenu;
