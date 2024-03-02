import React from 'react';

import { IconProps } from 'types/icon';

const Cart: React.FC<IconProps> = ({
  size = '16',
  color = 'currentColor',
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      role="img"
      aria-labelledby="cartIconTitle"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <title id="cartIconTitle">Cart</title>
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="18" cy="19" r="1" />
      <path d="M6 6H3" />
    </svg>
  );
};

export default Cart;
