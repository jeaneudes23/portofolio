import React, { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'


export const SubmitButton = ({disabled,className,children,...props}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {pending} = useFormStatus()
  const loading = pending || disabled
  return (
    <button disabled={loading} className={`cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  )
}
