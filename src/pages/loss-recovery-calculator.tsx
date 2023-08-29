import DefaultButton from '@/components/designSystem/button/DefaultButton'
import '../app/global.scss';
import 'dayjs/locale/ko';
import { Radio, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from '@/app/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import DefaultModal from '@/components/designSystem/modal/DefaultModal';

const LossRecoveryCalculator = () => {
 dayjs.locale('ko');
 const router = useRouter();
 const [purchasePrice, setPurchasePrice] = useState(10000); // 매수가
 const [lossPercentage, setLossPercentage] = useState(0); // 손실률
 const [displayLossPercentage, setDisplayLossPercentage] = useState('0'); // 손실률
 const [recoveryRate, setRecoveryRate] = useState(0); // 손실률
 const [isShown, setShow] = useState(false); // 매수가
 function checkNumberInput(inputValue: any) {
  // 입력 값이 숫자인지 확인
  if (isNaN(inputValue)) {
    return false;
  }

  // 입력 값이 소수인지 확인
  if (Number(inputValue) % 1 !== 0 || inputValue.endsWith(".") || Number.isInteger(Number(inputValue))) {
    return true;
  }

  return false;
}
 const handleClickEvent = {
  backHistoryRoute: () => {
    router.push('/');
  },
  openPopup:() => {
   const currentPrice = purchasePrice * (1 - lossPercentage);
   const recoveryRate = ((purchasePrice - currentPrice) / currentPrice) * 100;
   setRecoveryRate(recoveryRate);
   setShow(true);
  },
  closePopup:() => {
   setShow(false);
  },
 }
 const handleChangeEvent = {
  lossPercentage: (event: React.ChangeEvent<HTMLInputElement>) => {
   console.log('checkNumberInput(event.target.value)', event.target.value);
   // if(checkNumberInput(event.target.value)) {
    console.log('event.target.value', event.target.value);
    if (event.target.value === '') {
      console.info('ww');
     setDisplayLossPercentage('0');
     setLossPercentage(0);
     return;
   }
   if(parseInt(event.target.value) < 100) {
    if(event.target.value.length > 1 && event.target.value.charAt(0) === '0') {
      console.info('ww1');
      setLossPercentage(parseInt(event.target.value.substring(1, event.target.value.length)) * 0.01);
      setDisplayLossPercentage(parseFloat(event.target.value.substring(1, event.target.value.length)).toString());
     } else {
      console.info('ww2');
      setDisplayLossPercentage(parseFloat(event.target.value).toString());
      setLossPercentage(parseInt(event.target.value) * 0.01);
     }
   }
  }
 }
  return (
   <LocalizationProvider dateAdapter={AdapterDayjs}>
   <ThemeProvider theme={theme}>
   <DefaultModal
       isShown={isShown}
       onClose={handleClickEvent.closePopup}
     >
       <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] flex flex-col justify-between bg-white h-auto shadow-2xl rounded-[10px] p-[30px]'>
         <h1 className='text-[26px] text-gray-700 font-medium text-center mb-12 break-words whitespace-nowrap'>
           계산 결과
         </h1>
         <div>
           <div className='flex flex-col items-start mb-[18px] last:mb-0'>
             <p className='text-ellipsis overflow-hidden text-[18px] text-gray-500 font-medium '>
               복구를 위한 수익률
             </p>
             <p>{`${recoveryRate.toFixed(2)}%`}</p>
           </div>

           <DefaultButton
             rippleEffect
             onClick={handleClickEvent.closePopup}
             variant={'primary'}
             height={'40px'}
             className='mt-[60px]'
           >
             <p>확인</p>
           </DefaultButton>
         </div>
       </div>
     </DefaultModal>
     <div className='flex flex-col justify-between w-full h-full p-8'>
       <div>
         <header className='relative flex items-center justify-center mb-12'>
           <button
             onClick={handleClickEvent.backHistoryRoute}
             className='absolute left-0'
           >
             <ArrowBackIosIcon sx={{ fill: '#676767' }} />
           </button>
           <h1 className='w-full text-ellipsis overflow-hidden text-[21px] text-center px-[30px] tracking-tighter whitespace-nowrap'>
             주식 손실 복구 계산기
           </h1>
         </header>

         <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
           <label className='w-[100px] whitespace-nowrap'>현재 손실률</label>
           <TextField
             id='outlined-required'
             type='number'
             label='손실률'
             variant={'outlined'}
             className='flex-1'
             inputProps={{ inputMode: 'decimal', maxLength: 5 }}
             onChange={handleChangeEvent.lossPercentage}
             value={displayLossPercentage}
           />
         </div>
         {/* <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
           <label className='w-[100px] whitespace-nowrap'>현재가</label>
           <TextField
             id='outlined-required'
             label='현재가'
             className='flex-1'
             inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
             onChange={() => {}}
             sx={{
               border: '1px',
             }}
             value={purchasePrice}
           />
         </div> */}
       </div>
       <DefaultButton
         rippleEffect
         onClick={handleClickEvent.openPopup}
         variant={'primary'}
         height={'60px'}
       >
         <p>계산해보기</p>
       </DefaultButton>
     </div>
    </ThemeProvider>
   </LocalizationProvider>
   
  )
}
export default LossRecoveryCalculator