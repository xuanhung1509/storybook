import React from 'react';
import useMeasure from 'react-use-measure';
import { AnimatePresence, motion } from 'framer-motion';
import cx from '@/utils/classnames';

interface ResizablePanelProps {
  visible?: boolean;
  className?: string;
  children: React.ReactNode;
}

const ResizablePanel = ({
  visible = true,
  className,
  children,
}: ResizablePanelProps) => {
  const [ref, { height }] = useMeasure();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cx('overflow-hidden', className)}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: height || 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <div ref={ref}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResizablePanel;
