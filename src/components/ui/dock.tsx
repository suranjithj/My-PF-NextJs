'use client'

import React, { useRef } from "react"
import { cva } from "class-variance-authority"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type HTMLMotionProps,
} from "framer-motion"
import { cn } from "@/lib/utils"

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-white/20 p-2 backdrop-blur-md"
)

export interface DockProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  className?: string
  children: React.ReactNode
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue<number>(Infinity)

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, {
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification,
            distance: iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
          mouseX.set(e.nativeEvent.pageX ?? Infinity)
        }
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
}

const DockIcon = React.forwardRef<HTMLDivElement, DockIconProps>(
  (
    {
      size = DEFAULT_SIZE,
      magnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      mouseX,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const ref = useRef<HTMLDivElement>(null)
    const padding = Math.max(6, size * 0.2)
    const defaultMouseX = useMotionValue<number>(Infinity)

    const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
      return val - bounds.x - bounds.width / 2
    })

    const targetSize = disableMagnification ? size : magnification

    const sizeTransform = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [size, targetSize, size]
    )

    const scaleSize = useSpring(sizeTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    })

    return (
      <motion.div
        ref={ref}
        style={{ width: scaleSize, height: scaleSize, padding }}
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full",
          disableMagnification && "hover:bg-muted-foreground transition-colors",
          className
        )}
        {...props}
      >
        <div>{children}</div>
      </motion.div>
    )
  }
)

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
