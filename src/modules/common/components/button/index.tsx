import { clx } from '@medusajs/ui';
import React from 'react';

export default function Button({
  children,
  className,
  onClick,
  disabled,
  isLoading,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <button
      className={clx(
        'text-white px-3 rounded-lg h-12 font-semibold font-raleway bg-primary-500 hover:bg-primary-600',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-sm" />
      ) : (
        children
      )}
    </button>
  );
}
