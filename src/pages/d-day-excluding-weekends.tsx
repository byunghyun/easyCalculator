import React, { useState } from 'react';
import '../app/global.scss';
import 'dayjs/locale/ko';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import DefaultButton from '@/components/designSystem/button/DefaultButton';
import Radio from '@mui/material/Radio';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/app/theme';
import { dateDiff } from '@/utils/dateCalc';
import _ from 'lodash';
import DefaultModal from '@/components/designSystem/modal/DefaultModal';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DDayExcludingWeekends = () => {
  dayjs.locale('ko');
  const router = useRouter();
  const [isShownResult, setShowResult] = useState(false);
  const [isExcludingWeekends, setExcludingWeekends] = useState(false);
  const [targetDate, setTargetDate] = useState(dayjs());
  const [resultCountDate, setResultCountDate] = useState(0);
  const [vacationDayCount, setVacationDayCount] = useState(0);
  const handleClickEvent = {
    closeResultPopup: () => {
      setShowResult(false);
    },
    backHistoryRoute: () => {
      router.push('/');
    },
    calcResult: () => {
      const today = dayjs().toDate();
      const inputTargetDate = targetDate.toDate();

      let excludingWeekendsCount = 0;
      let weekendCount = 0;

      while (true) {
        var temp_date = today;
        if (temp_date.getTime() > inputTargetDate.getTime()) {
          break;
        } else {
          var tmp = temp_date.getDay();
          if (tmp == 0 || tmp == 6) {
            weekendCount++;
          } else {
            excludingWeekendsCount++;
          }
          temp_date.setDate(today.getDate() + 1);
        }
      }
      setShowResult(true);
      if (isExcludingWeekends) {
        setResultCountDate(excludingWeekendsCount - vacationDayCount);
      } else {
        setResultCountDate(
          excludingWeekendsCount + weekendCount - vacationDayCount,
        );
      }
    },
  };
  const handleChangeEvent = {
    vacationDayCount: (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('event :>> ', event);
      const value = parseInt(event.target.value);
      console.log('value :>> ', value);
      if (_.isNaN(value)) return setVacationDayCount(0);
      if (_.isNumber(value)) {
        setVacationDayCount(value);
      }
    },
    targetDate: (event: Dayjs | null) => {
      if (event === null) return;
      setTargetDate(event);
    },
    excludingWeekends: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'noExcludingWeekends') {
        setExcludingWeekends(false);
      }
      if (event.target.value === 'excludingWeekends') {
        setExcludingWeekends(true);
      }
    },
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DefaultModal
          isShown={isShownResult}
          onClose={handleClickEvent.closeResultPopup}
        >
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] flex flex-col justify-between bg-white h-auto shadow-2xl rounded-[10px] p-[30px]'>
            <h1 className='text-[26px] text-gray-700 font-medium text-center mb-12 break-words whitespace-nowrap'>
              계산 결과
            </h1>
            <div>
              <div className='flex flex-col items-start mb-[18px] last:mb-0'>
                <p className='text-ellipsis overflow-hidden text-[18px] text-gray-500 font-medium '>
                  남은 일수
                </p>
                <p>{resultCountDate}일</p>
              </div>

              <DefaultButton
                rippleEffect
                onClick={handleClickEvent.closeResultPopup}
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
                퇴사일 D-Day (주말 제외 가능)
              </h1>
            </header>

            <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
              <label className='w-[100px] whitespace-nowrap'>목표일</label>
              <DesktopDatePicker
                label='목표일'
                inputFormat='YYYY-MM-DD'
                className='flex-1'
                value={targetDate}
                onChange={handleChangeEvent.targetDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
              <label className='w-[100px] whitespace-nowrap'>보유 휴무일</label>
              <TextField
                id='outlined-required'
                label='보유 휴무일'
                className='flex-1'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={handleChangeEvent.vacationDayCount}
                sx={{
                  border: '1px',
                }}
                value={vacationDayCount}
              />
            </div>
            <div className='flex flex-row items-center justify-between w-full'>
              <label className='w-[100px] whitespace-nowrap'>목표일</label>
              <div className='flex flex-row flex-1'>
                <div className='mr-[15px]'>
                  <Radio
                    checked={isExcludingWeekends}
                    onChange={handleChangeEvent.excludingWeekends}
                    value={'excludingWeekends'}
                    id='excludingWeekends'
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'A' }}
                    color='primary'
                  />
                  <label
                    htmlFor='excludingWeekends'
                    className='hover:cursor-pointer'
                  >
                    주말 제외
                  </label>
                </div>
                <div className=''>
                  <Radio
                    checked={!isExcludingWeekends}
                    onChange={handleChangeEvent.excludingWeekends}
                    value={'noExcludingWeekends'}
                    id='noExcludingWeekends'
                    name='radio-buttons'
                    inputProps={{ 'aria-label': 'B' }}
                    color='primary'
                  />
                  <label
                    htmlFor='noExcludingWeekends'
                    className='hover:cursor-pointer'
                  >
                    주말 포함
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DefaultButton
            rippleEffect
            onClick={handleClickEvent.calcResult}
            variant={'primary'}
            height={'60px'}
          >
            <p>계산해보기</p>
          </DefaultButton>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DDayExcludingWeekends;
