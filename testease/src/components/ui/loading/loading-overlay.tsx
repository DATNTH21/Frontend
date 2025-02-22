'use client';

import React from 'react';

type LoadingOverlayProps = {
  isVisible?: boolean;
  spinner: React.ReactNode;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible = true, spinner }) => {
  if (!isVisible) return null;

  return (
    <div className='fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center z-[999999] !m-0'>
      {spinner}
    </div>
  );
};

export default LoadingOverlay;
