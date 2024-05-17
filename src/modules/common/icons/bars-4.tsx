import React from 'react';

import { IconProps } from 'types/icon';

const Bars4Icon: React.FC<IconProps> = ({
  size = '24',
  color = 'currentColor',
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Bars4Icon;
