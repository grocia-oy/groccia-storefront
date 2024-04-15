'use client';

import { clx } from '@medusajs/ui';
import React from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clx(
        'bg-primary-500 text-white px-3 rounded-lg h-12 font-bold',
        className
      )}
      type="submit"
    >
      {pending ? (
        <span className="loading loading-dots loading-sm" />
      ) : (
        children
      )}
    </button>
  );
}
