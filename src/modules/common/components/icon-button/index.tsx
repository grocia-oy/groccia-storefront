import { clx } from '@medusajs/ui';
import React, { memo } from 'react';

const IconButton = memo(
  ({
    icon,
    children,
    className,
    onClick,
    disabled,
    isLoading,
  }: {
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  }) => {
    return (
      <button
        className={clx('px-3 py-2 rounded-lg h-12 font-raleway', className)}
        onClick={onClick}
        disabled={disabled}
      >
        {isLoading ? (
          <span className="loading loading-dots loading-sm" />
        ) : (
          <div className='flex space-x-6'>
            {icon && <i>{icon}</i>}
            <div className='w-full'>{children}</div>
          </div>
        )}
      </button>
    );
  }
);

export default IconButton;
