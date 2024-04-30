'use client';
import { useDictionary } from '@lib/context/dictionary-context';
import LoginModal from '@modules/account/components/login-modal';
import { MouseEventHandler, useState } from 'react';

export default function LoginButtonModal() {
  const [open, setOpen] = useState(false);
  const dictionary = useDictionary();

  const onLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    setOpen(true);
  };

  return (
    <div>
      <button
        onClick={onLoginButtonClick}
        className="flex cursor-pointer items-center"
      >
        <div className="">{dictionary.layout.nav.loginButtonTitle}</div>
      </button>
      <LoginModal open={open} setOpen={setOpen} />
    </div>
  );
}
