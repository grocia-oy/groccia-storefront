'use client';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { LocalStorageKey } from '@lib/constants';
import Input from '@modules/common/components/input';
import { FormEventHandler, RefObject, useEffect, useState } from 'react';

type Props = {
  modalRef: RefObject<HTMLDialogElement>;
};

export default function PostcodeButtonModal({ modalRef }: Props) {
  const [displayPostcode, setDisplayPostcode] = useState<string | null>();
  const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(
    null
  );

  const onPostcodeSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const inputPostcode = e.currentTarget.postcode.value;

    if (!inputPostcode) {
      setInputErrorMessage('* The field is empty');
      return;
    }

    // Set
    setDisplayPostcode(inputPostcode);
    setInputErrorMessage(null);
    localStorage.setItem(LocalStorageKey.POSTCODE, inputPostcode);
    modalRef?.current?.close();
  };

  useEffect(() => {
    setDisplayPostcode(localStorage.getItem(LocalStorageKey.POSTCODE));
  }, []);

  return (
    <div>
      <button
        className="hidden lg:flex cursor-pointer items-center"
        onClick={() => modalRef?.current?.showModal()}
      >
        <span className='mr-1'>
          <MapPinIcon className="w-5 h-5" />
        </span>
        {displayPostcode || 'Postcode'}
      </button>
      <dialog
        id="postalCodeModal"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <div className="flex justify-center items-center">
            <div>
              <div>
                <h3 className="font-semibold text-xl text-primary/80">
                  Choose your postcode for delivery
                </h3>
                <h4 className="text-sm">See what available in your area</h4>
              </div>
              <div className="mt-5">
                <form
                  onSubmit={onPostcodeSubmit}
                  className="flex w-full space-x-3"
                  noValidate
                >
                  <div className="w-[250px]">
                    <Input
                      label="Postcode (example: 00120)"
                      type="text"
                      name="postcode"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary text-xs text-white px-2"
                  >
                    Let's shop
                  </button>
                </form>
                <div className="text-rose-800 text-xs mt-1 h-3">
                  {inputErrorMessage}
                </div>
              </div>
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
