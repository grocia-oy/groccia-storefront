'use client';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { LocalStorageKey } from '@lib/constants';
import { FormEventHandler, RefObject, useState } from 'react';

type Props = {
  modalRef: RefObject<HTMLDialogElement>;
};

export default function PostcodeButtonModal({ modalRef }: Props) {
  const [displayPostcode, setDisplayPostcode] = useState<string | null>(
    localStorage.getItem(LocalStorageKey.POSTCODE)
  );

  const onPostcodeSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const inputPostcode = e.currentTarget.postcode.value;

    if (!inputPostcode) {
      return;
    }

    // Set
    setDisplayPostcode(inputPostcode);
    localStorage.setItem(LocalStorageKey.POSTCODE, inputPostcode);
    modalRef?.current?.close();
  };

  return (
    <div>
      <button
        className="flex cursor-pointer text-base px-2 py-1 items-center"
        onClick={() => modalRef?.current?.showModal()}
      >
        <span>
          <MapPinIcon className="w-6 h-6 stroke-2 mr-1" />
        </span>
        {displayPostcode ? displayPostcode : 'Postcode'}
      </button>
      <dialog
        id="postalCodeModal"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <div className="flex-col text-center items-center justify-center">
            <div>
              <h3 className="font-semibold text-xl text-primary/80">
                Choose your postcode for delivery
              </h3>
              <h4>See what available in your area</h4>
            </div>
            <div className="mt-5">
              <form
                onSubmit={onPostcodeSubmit}
                className="flex items-center w-full justify-center"
                noValidate
              >
                <input
                  type="text"
                  placeholder="Example: 00120"
                  id="postcode"
                  name="postcode"
                  required={true}
                  className="input flex-1 w-full max-w-xs bg-neutral placeholder:text-input-placeholder focus:outline-0 focus:border-0 focus:ring-2 focus:ring-primary/80 pr-24 rounded-r-none peer"
                />
                <button
                  type="submit"
                  className="btn btn-primary text-white rounded-l-none peer-focus:ring-2 peer-focus:ring-primary"
                >
                  Let's shop
                </button>
              </form>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close dialog</button>
        </form>
      </dialog>
    </div>
  );
}
