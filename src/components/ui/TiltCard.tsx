'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Default ±8°. */
  maxTilt?: number;
}

const SPRING = { stiffness: 150, damping: 20 };

export function TiltCard({ children, className, maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  // Normalized cursor position: −0.5 (top/left) → 0.5 (bottom/right)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map cursor to rotation. Y-cursor → rotateX (inverted for natural feel),
  // X-cursor → rotateY. Spring wrappers smooth the motion.
  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateXSpring = useSpring(rotateX, SPRING);
  const rotateYSpring = useSpring(rotateY, SPRING);

  // Touch devices don't need tilt — matchMedia runs client-only after mount.
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const onMouseMove = canHover
    ? (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }
    : undefined;

  const onMouseLeave = canHover
    ? () => {
        x.set(0);
        y.set(0);
      }
    : undefined;

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformPerspective: 1200,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
