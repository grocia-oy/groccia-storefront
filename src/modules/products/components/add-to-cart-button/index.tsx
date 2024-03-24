'use client';

import PlusCircle from '@modules/common/icons/plus-circle';
import React from 'react';

interface Props {
  buttonProps: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

function AddToCartButton({ buttonProps }: Props) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      {...buttonProps}
    >
      <PlusCircle className="w-12 h-12" />
    </button>
  );
}

export default AddToCartButton;
