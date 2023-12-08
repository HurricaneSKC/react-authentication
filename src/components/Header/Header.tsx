import React from "react"

interface HeaderProps {
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  customClassName?: string
}

const Header: React.FC<HeaderProps> = ({ text, level, customClassName }) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements

  return <CustomTag className={customClassName}>{text}</CustomTag>
}

export default Header
