import * as React from 'react';
import clsx from 'clsx';

import Header from 'components/Header';

interface Props {
    children: React.ReactNode;
  }
  
const Layout = ({ children }: Props): JSX.Element => {
  const scrollRef = React.useRef(null);

  return (
    <div
      className='min-h-screen'
      ref={scrollRef}>
      <Header />
      <main
        className={clsx(
          'xl:pl-24',
          'flex-grow',
          'relative'
        )}>
        {children}
      </main>
    </div>
  );
};
  
export default Layout;
  