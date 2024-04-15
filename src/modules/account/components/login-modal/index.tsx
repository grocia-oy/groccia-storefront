import { RefObject, useState } from 'react';
import Login from '../login';
import Register from '../register';

export enum LOGIN_VIEW {
  LOGIN = 'login',
  REGISTER = 'register',
}

type Props = {
  modalRef: RefObject<HTMLDialogElement>;
};

export default function LoginModal({ modalRef }: Props) {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.LOGIN);

  return (
    <dialog
      id="loginModal"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost absolute right-3 top-3 text-lg rounded-full bg-neutral hover:bg-gray-300">
            ✕
          </button>
        </form>
        <div className="mt-12 px-4 py-2">
          {currentView === 'login' ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close dialog</button>
      </form>
    </dialog>
  );
}
