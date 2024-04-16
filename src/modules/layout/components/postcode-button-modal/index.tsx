'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import { LocalStorageKey } from '@lib/constants';
import { useDictionary } from '@lib/context/dictionary-context';
import Input from '@modules/common/components/input';
import { FormEventHandler, useEffect, useState, useRef } from 'react';

export default function PostcodeButtonModal() {
  const postalCodeModalRef = useRef<HTMLDialogElement>(null);
  const [displayPostcode, setDisplayPostcode] = useState<string | null>();
  const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(
    null
  );
  const dictionary = useDictionary();

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
    postalCodeModalRef?.current?.close();
  };

  useEffect(() => {
    setDisplayPostcode(localStorage.getItem(LocalStorageKey.POSTCODE));
  }, []);

  return (
    <div>
      <button
        className="hidden lg:flex cursor-pointer items-center"
        onClick={() => postalCodeModalRef?.current?.showModal()}
      >
        <span className="mr-1">
          <MapPinIcon className="w-5 h-5" />
        </span>
        {displayPostcode || dictionary.layout.nav.postcodeModal.showModalButton}
      </button>
      <dialog
        id="postalCodeModal"
        className="modal modal-bottom sm:modal-middle"
        ref={postalCodeModalRef}
      >
        <div className="modal-box">
          <div className="flex justify-center items-center">
            <div>
              <div>
                <h3 className="font-semibold text-xl text-primary/80">
                  {dictionary.layout.nav.postcodeModal.h3}
                </h3>
                <h4 className="text-sm">
                  {dictionary.layout.nav.postcodeModal.h4}
                </h4>
              </div>
              <div className="mt-5">
                <form
                  onSubmit={onPostcodeSubmit}
                  className="flex w-full space-x-3"
                  noValidate
                >
                  <div className="w-[250px]">
                    <Input
                      label={dictionary.layout.nav.postcodeModal.submitButtonLabel}
                      type="text"
                      name="postcode"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary text-xs text-white px-2"
                  >
                    {dictionary.layout.nav.postcodeModal.submitButton}
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
