import React, { InputHTMLAttributes } from 'react';
import Ripples from 'react-ripples';

type ButtonVariant =
  | 'primary'
  | 'default'
  | 'outline'
  | 'primary-outline'
  | 'light-primary';

interface DefaultButtonInterface
  extends Omit<InputHTMLAttributes<HTMLButtonElement>, 'type' | 'value'> {
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: number;
  variant: ButtonVariant;
  className?: string;
  height?: string;
  rippleEffect?: boolean;
}

const DefaultButton = ({
  children,
  fontSize = '15px',
  fontWeight = 500,
  variant = 'default',
  className,
  height = '40px',
  rippleEffect,
  ...rest
}: DefaultButtonInterface) => {
  const buttonDesignVariant = () => {
    switch (variant) {
      case 'primary': {
        return 'w-full h-full rounded-[4px] bg-primary-medium text-white rounded-[4px] ';
        break;
      }
      case 'light-primary': {
        return 'w-full h-full rounded-[4px] !bg-secondary text-primary-medium rounded-[4px] ';
        break;
      }
      case 'primary-outline': {
        return 'w-full h-full rounded-[4px] bg-white text-primary-medium rounded-[4px]';
        break;
      }
      default: {
        return 'w-full h-full rounded-[4px] bg-gray-300 text-gray-600 rounded-[4px] ';
        break;
      }
    }
  };
  if (rippleEffect) {
    return (
      <div
        className={'w-auto ' + (className ? className : '')}
        style={{ height: height ? height : 'auto' }}
      >
        <Ripples className={'w-full h-full '}>
          <div className={'w-full overflow-hidden '}>
            <button
              className={
                'w-full px-[10px] hover:cursor-pointer disabled:!cursor-not-allowed disabled:!bg-[#e6e6e6] disabled:!text-[#fff] disabled:!border-0 disabled:!border-[#e6e6e6] ' +
                buttonDesignVariant() +
                (variant === 'primary-outline' ? ' border-primary-solid ' : '')
              }
              style={{
                ...rest.style,
                fontSize,
                fontWeight,
              }}
              {...rest}
            >
              {children}
            </button>
          </div>
        </Ripples>
      </div>
    );
  } else {
    return (
      <div
        className={
          'w-full rounded-[4px] overflow-hidden ' +
          (className ? className : '') +
          (variant === 'primary-outline' ? 'border-primary-solid ' : '')
        }
      >
        <button
          className={
            'w-full disabled:!cursor-not-allowed hover:cursor-pointer disabled:!bg-[#e6e6e6] disabled:!text-[#fff] disabled:!border-0 disabled:!border-[#e6e6e6] ' +
            buttonDesignVariant()
          }
          style={{
            ...rest.style,
            fontSize,
            fontWeight,
          }}
          {...rest}
        >
          {children}
        </button>
      </div>
    );
  }
};

export default DefaultButton;
