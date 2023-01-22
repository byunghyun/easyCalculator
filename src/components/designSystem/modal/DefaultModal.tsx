import {
  framerModalDarkBackgroundAnimation,
  popupContainerSpring,
} from '@/animations/popupMotions';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface DefaultModalInterface {
  isShown: boolean;
  onClose: () => void;
  children: React.ReactNode;
  zIndex?: number;
}

const DefaultModal = ({
  isShown,
  onClose,
  children,
  zIndex = 100,
}: DefaultModalInterface) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handleClickEvent = {
    modalClose: function (this: HTMLDivElement, event: MouseEvent) {
      if (isShown) onClose();
    },
  };

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.addEventListener(
        'click',
        handleClickEvent.modalClose,
      );
    }
    return () => {
      if (backgroundRef.current) {
        backgroundRef.current.removeEventListener(
          'click',
          handleClickEvent.modalClose,
        );
      }
    };
  }, [backgroundRef.current, isShown]);
  return (
    <>
      <AnimatePresence>
        {isShown && (
          <div
            className='fixed top-0 left-0 w-full h-full'
            style={{ zIndex: zIndex }}
          >
            <motion.div
              ref={backgroundRef}
              variants={framerModalDarkBackgroundAnimation}
              initial={'hidden'}
              animate={'show'}
              className='w-full h-full bg-[#00000050]'
            >
              &nbsp;
            </motion.div>
            <motion.div
              variants={popupContainerSpring}
              initial={'hidden'}
              animate={'show'}
              className='position-center bg-transparent w-[80%]'
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DefaultModal;
