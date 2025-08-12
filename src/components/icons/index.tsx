import { cn } from "@/lib/utils";
import { SVGAttributes } from "react";

interface IconProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

export const StarIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={cn("star", className)}
    viewBox="0 0 24 24"
    fill="gold"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2l2.39 7.26H22l-6.17 4.48 2.39 7.26L12 16.52l-6.22 4.48 2.39-7.26L2 9.26h7.61L12 2z" />
  </svg>
);

export const MoonIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={cn("moon", className)}
    viewBox="0 0 24 24"
    fill="#f6e58d"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1021 12.79z" />
  </svg>
);

export const HeartIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={cn("heart", className)}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="gradHeart" x1="0" x2="1">
        <stop offset="0%" stopColor="#ff9a9e" />
        <stop offset="100%" stopColor="#ff6b81" />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradHeart)"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               1.09-1.28 2.76-2.09 4.5-2.09
               3.08 0 5.5 2.42 5.5 5.5
               0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

export const CloudIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={cn("cloud", className)}
    viewBox="0 0 64 64"
    fill="#ffffff"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M48,32a12,12,0,0,0-11.8-12A9,9,0,0,0,20,21a9,9,0,0,0-1,17.94V39H48A12,12,0,0,0,48,32Z" />
  </svg>
);
