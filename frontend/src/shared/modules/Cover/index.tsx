import React, { ReactNode } from 'react';

interface CoverProps {
  children: ReactNode;
}

const Cover: React.FC<CoverProps> = ({ children }) => {
  return (
    <div className=''>
      {children}
    </div>
  );
};

export default Cover;
