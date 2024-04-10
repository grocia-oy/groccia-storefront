'use client';

import { useState } from 'react';
import AnimatedHamburgerXmark from '../animated-hamburger-xmark';

function AnimatedHamburgerWrapper() {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  return (
    <div className="flex-1 lg:hidden">
      <button onClick={() => setSideBarOpen((prevState) => !prevState)}>
        <AnimatedHamburgerXmark opened={sideBarOpen} />
      </button>
    </div>
  );
}

export default AnimatedHamburgerWrapper;
