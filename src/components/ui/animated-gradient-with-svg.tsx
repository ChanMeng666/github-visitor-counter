"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

interface CircleConfig {
  top: number;
  left: number;
  size: number;
  transforms: {
    tx1: number;
    ty1: number;
    tx2: number;
    ty2: number;
    tx3: number;
    ty3: number;
    tx4: number;
    ty4: number;
  };
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(containerRef as React.RefObject<HTMLElement>);
  const [mounted, setMounted] = useState(false);

  // Generate stable random values only on client side after mount
  const [circleConfigs] = useState<CircleConfig[]>(() =>
    colors.map(() => ({
      top: 0,
      left: 0,
      size: 1,
      transforms: {
        tx1: 0,
        ty1: 0,
        tx2: 0,
        ty2: 0,
        tx3: 0,
        ty3: 0,
        tx4: 0,
        ty4: 0,
      },
    }))
  );

  useEffect(() => {
    // Generate random values only on client side
    circleConfigs.forEach((config) => {
      config.top = Math.random() * 50;
      config.left = Math.random() * 50;
      config.size = randomInt(0.5, 1.5);
      config.transforms = {
        tx1: Math.random() - 0.5,
        ty1: Math.random() - 0.5,
        tx2: Math.random() - 0.5,
        ty2: Math.random() - 0.5,
        tx3: Math.random() - 0.5,
        ty3: Math.random() - 0.5,
        tx4: Math.random() - 0.5,
        ty4: Math.random() - 0.5,
      };
    });
    setMounted(true);
  }, [circleConfigs]);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  if (!mounted) {
    return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {colors.map((color, index) => {
          const config = circleConfigs[index];
          return (
            <svg
              key={index}
              className="absolute animate-background-gradient"
              style={
                {
                  top: `${config.top}%`,
                  left: `${config.left}%`,
                  "--background-gradient-speed": `${1 / speed}s`,
                  "--tx-1": config.transforms.tx1,
                  "--ty-1": config.transforms.ty1,
                  "--tx-2": config.transforms.tx2,
                  "--ty-2": config.transforms.ty2,
                  "--tx-3": config.transforms.tx3,
                  "--ty-3": config.transforms.ty3,
                  "--tx-4": config.transforms.tx4,
                  "--ty-4": config.transforms.ty4,
                } as React.CSSProperties
              }
              width={circleSize * config.size}
              height={circleSize * config.size}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={color}
                className="opacity-30 dark:opacity-[0.15]"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export { AnimatedGradient };
