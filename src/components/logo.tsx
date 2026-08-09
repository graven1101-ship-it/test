import * as React from "react"

const logoSrc = new URL("../assets/pmsLOGO.png", import.meta.url).href

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
}

export function Logo({ size = 240, className, alt = "Logo", ...props }: LogoProps) {
  return (
    <img
      src={logoSrc}
      width={size}
      height={size}
      alt={alt}
      className={className}
      {...props}
    />
  )
}
