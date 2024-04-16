'use client';

import React from 'react';
import AnimatedHamburgerXmark from '@modules/common/components/animated-hamburger-xmark';

function Sidebar() {
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);

  return (
    <button onClick={() => setSideBarOpen((prevState) => !prevState)}>
      <AnimatedHamburgerXmark opened={sideBarOpen} />
    </button>
  );
}

export default Sidebar;
