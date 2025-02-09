'use client';

import React from 'react';

type LoadingOverlayProps = {
  isVisible?: boolean;
  spinner: React.ReactNode;
  coverBody?: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible = true, spinner, coverBody = true }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`${coverBody ? 'fixed bg-black bg-opacity-50' : 'absolute'} inset-0 flex justify-center items-center z-[999999] !m-0`}
    >
      {spinner}
    </div>
  );
};

export default LoadingOverlay;
