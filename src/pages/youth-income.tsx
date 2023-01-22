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
import DefaultModal from '@/components/designSystem/\bmodal/DefaultModal';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const youthIncome = () => {
  dayjs.locale('ko');
  const router = useRouter();
  const [isShownResult, setShowResult] = useState(false);

  const [birthDate, setBirthDate] = useState(dayjs());
  const [employmentDate, setEmploymentDate] = useState(dayjs());
  const [enlistmentDate, setEnlistmentDate] = useState(dayjs());
  const [militaryDischargeDate, setMilitaryDischargeDate] = useState(dayjs());
  const [selectedMilitary, setSelectedMilitary] = useState<
    'notObligatoryMilitaryService' | 'completedMilitaryService'
  >('notObligatoryMilitaryService');
  const [resultBirthYear, setResultBirthYear] = useState(0);
  const [resultBirthMonth, setResultBirthMonth] = useState(0);
  const [resultBirthDate, setResultBirthDate] = useState(0);

  const [resultMilitaryYear, setResultMilitaryYear] = useState(0);
  const [resultMilitaryMonth, setResultMilitaryMonth] = useState(0);
  const [resultMilitaryDate, setResultMilitaryDate] = useState(0);

  const [resultSubtractMilitaryYear, setResultSubtractMilitaryYear] =
    useState(0);
  const [resultSubtractMilitaryMonth, setResultSubtractMilitaryMonth] =
    useState(0);
  const [resultSubtractMilitaryDate, setResultSubtractMilitaryDate] =
    useState(0);

  const handleChangeEvent = {
    birthDate: (event: Dayjs | null) => {
      if (event === null) return;
      setBirthDate(event);
    },
    employmentDate: (event: Dayjs | null) => {
      if (event === null) return;
      setEmploymentDate(event);
    },
    enlistmentDate: (event: Dayjs | null) => {
      if (event === null) return;
      setEnlistmentDate(event);
    },
    militaryDischargeDate: (event: Dayjs | null) => {
      if (event === null) return;
      setMilitaryDischargeDate(event);
    },
    selectedMilitary: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        event.target.value === 'notObligatoryMilitaryService' ||
        event.target.value === 'completedMilitaryService'
      ) {
        setSelectedMilitary(event.target.value);
      }
    },
  };
  const handleClickEvent = {
    closeResultPopup: () => {
      setShowResult(false);
    },
    backHistoryRoute: () => {
      router.push('/');
    },
    calcResult: (event: React.MouseEvent<HTMLButtonElement>) => {
      const resultBirthDate = dateDiff(birthDate, employmentDate);
      setResultBirthYear(resultBirthDate.year);
      setResultBirthMonth(resultBirthDate.month);
      setResultBirthDate(resultBirthDate.date);

      const resultMilitaryDate = dateDiff(
        selectedMilitary === 'completedMilitaryService'
          ? enlistmentDate
          : dayjs(),
        selectedMilitary === 'completedMilitaryService'
          ? militaryDischargeDate
          : dayjs(),
      );
      setResultMilitaryYear(resultMilitaryDate.year);
      setResultMilitaryMonth(resultMilitaryDate.month);
      setResultMilitaryDate(resultMilitaryDate.date);

      const addMilitaryDate = birthDate
        .add(resultMilitaryDate.year, 'year')
        .add(resultMilitaryDate.month, 'month')
        .add(resultMilitaryDate.date, 'day');

      const resultSubtractMilitaryDate = dateDiff(
        addMilitaryDate,
        employmentDate,
      );
      setResultSubtractMilitaryYear(resultSubtractMilitaryDate.year);
      setResultSubtractMilitaryMonth(resultSubtractMilitaryDate.month);
      setResultSubtractMilitaryDate(resultSubtractMilitaryDate.date);

      setShowResult(true);
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
                  최초 취업일 당시 만 나이
                </p>
                <p>
                  {resultBirthYear}년 {resultBirthMonth}월 {resultBirthDate}일
                </p>
              </div>

              <div className='flex flex-col items-start mb-[18px] last:mb-0'>
                <p className='text-ellipsis overflow-hidden text-[18px] text-gray-500 font-medium'>
                  병역 기간
                </p>
                <p>
                  {resultMilitaryYear}년 {resultMilitaryMonth}월{' '}
                  {resultMilitaryDate}일
                </p>
              </div>
              <div className='flex flex-col items-start mb-[18px] last:mb-0'>
                <p className='text-ellipsis overflow-hidden text-[18px] text-gray-500 font-medium'>
                  병역 기간을 차감한 후 나이
                </p>
                <p>
                  {resultSubtractMilitaryYear}년 {resultSubtractMilitaryMonth}월{' '}
                  {resultSubtractMilitaryDate}일
                </p>
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
                중소기업 소득세 감면 신청서 가이드
              </h1>
            </header>

            <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
              <label className='w-[100px] whitespace-nowrap'>생년월일</label>
              <DesktopDatePicker
                label='생년월일'
                inputFormat='YYYY-MM-DD'
                value={birthDate}
                className='flex-1'
                onChange={handleChangeEvent.birthDate}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      borderColor: 'red',
                    }}
                    {...params}
                  />
                )}
              />
            </div>
            <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
              <label className='w-[100px] whitespace-nowrap'>취업일</label>
              <DesktopDatePicker
                label='취업일'
                inputFormat='YYYY-MM-DD'
                value={employmentDate}
                className='flex-1'
                onChange={handleChangeEvent.employmentDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
              <label className='w-[100px] whitespace-nowrap'>군필여부</label>
              <div className='flex-1'>
                <div className=' flex flex-row items-center justify-start'>
                  <div className='mr-[15px]'>
                    <Radio
                      checked={selectedMilitary === 'completedMilitaryService'}
                      onChange={handleChangeEvent.selectedMilitary}
                      value='completedMilitaryService'
                      id='completedMilitaryService'
                      name='radio-buttons'
                      inputProps={{ 'aria-label': 'A' }}
                      color='primary'
                    />
                    <label
                      htmlFor='completedMilitaryService'
                      className='hover:cursor-pointer'
                    >
                      군필
                    </label>
                  </div>
                  <div className=''>
                    <Radio
                      checked={
                        selectedMilitary === 'notObligatoryMilitaryService'
                      }
                      onChange={handleChangeEvent.selectedMilitary}
                      value='notObligatoryMilitaryService'
                      id='notObligatoryMilitaryService'
                      name='radio-buttons'
                      inputProps={{ 'aria-label': 'B' }}
                      color='primary'
                    />
                    <label
                      htmlFor='notObligatoryMilitaryService'
                      className='hover:cursor-pointer'
                    >
                      미필
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {selectedMilitary === 'completedMilitaryService' && (
              <>
                <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
                  <label className='w-[100px] whitespace-nowrap'>입대일</label>
                  <DesktopDatePicker
                    label='입대일'
                    inputFormat='YYYY-MM-DD'
                    value={enlistmentDate}
                    className='flex-1'
                    onChange={handleChangeEvent.enlistmentDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className='last:mb-0 flex flex-row items-center justify-between mb-6'>
                  <label className='w-[100px] whitespace-nowrap'>전역일</label>
                  <DesktopDatePicker
                    label='전역일'
                    inputFormat='YYYY-MM-DD'
                    value={militaryDischargeDate}
                    className='flex-1'
                    onChange={handleChangeEvent.militaryDischargeDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </>
            )}
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

export default youthIncome;
