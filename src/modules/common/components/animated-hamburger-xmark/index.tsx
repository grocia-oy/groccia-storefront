import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type Props = {opened: boolean};

function AnimatedHamburgerXmark({opened}: Props) {
  return (
    <AnimatePresence mode="wait">
      {opened ? (
        <motion.div
          key="xmark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          className="w-5 h-5"
        >
          <XMarkIcon />
        </motion.div>
      ) : (
        <motion.div
          key="bars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          exit={{ opacity: 0 }}
          className="w-5 h-5"
        >
          <Bars2Icon />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedHamburgerXmark;
