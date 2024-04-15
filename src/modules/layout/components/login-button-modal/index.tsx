'use client';
import { useDictionary } from '@lib/context/dictionary-context';
import LoginModal from '@modules/account/components/login-modal';
import { MouseEventHandler, useRef } from 'react';

export default function LoginButtonModal() {
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const dictionary = useDictionary();

  const onLoginButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    loginModalRef.current?.showModal();
  };

  return (
    <div>
      <button
        onClick={onLoginButtonClick}
        className="flex cursor-pointer items-center"
      >
        <div className="">{dictionary.layout.navBar.loginButtonTitle}</div>
      </button>
      <LoginModal modalRef={loginModalRef} />
    </div>
  );
}
