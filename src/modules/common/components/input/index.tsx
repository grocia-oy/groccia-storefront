'use client';
import { Label } from '@medusajs/ui';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Eye from '@modules/common/icons/eye';
import EyeOff from '@modules/common/icons/eye-off';

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
  'placeholder'
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { type, name, label, touched, required, topLabel, className, ...props },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    console.log(showPassword);

    useEffect(() => {
      if (type === 'password' && showPassword) {
        setInputType('text');
      }

      if (type === 'password' && !showPassword) {
        setInputType('password');
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 text-small-medium">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full text-small-normal font-poppins">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className={twMerge(
              'pt-6 pb-1 block w-full h-12 px-4 mt-0 placeholder:text-input-placeholder bg-neutral rounded-md appearance-none focus:outline-none focus:border-none focus:ring-0',
              className
            )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="flex items-center justify-center mx-3 px-1 transition-all absolute duration-200 top-3 -z-1 origin-0 text-primary-700"
          >
            {label}
            {required && <span className="text-rose-700">*</span>}
          </label>
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-800 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
