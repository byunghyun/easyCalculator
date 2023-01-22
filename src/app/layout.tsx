import { RootLayoutPropsInterface } from '@/types';

const RootLayout = ({ children }: RootLayoutPropsInterface) => {
  return (
    <html lang='ko'>
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
