import * as React from 'react';

import clsx from 'clsx';

interface Props {
    children: React.ReactNode;
  }
  
const Layout = ({ children }: Props): JSX.Element => {
  const scrollRef = React.useRef(null);

  return (
    <div
      className='min-h-screen'
      ref={scrollRef}>
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
  