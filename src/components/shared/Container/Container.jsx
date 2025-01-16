import React from 'react'

export const Container = ({ children, className }) => {
  return (
    <div
      className={
        `container px-4 sm:px-6 md:px-10 lg:px-[50px]` + ' ' + className
      }
    >
      {children}
    </div>
  )
}
