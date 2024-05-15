'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import { LocalStorageKey } from '@lib/constants';
import { useDictionary } from '@lib/context/dictionary-context';
import Input from '@modules/common/components/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@modules/common/components/ui/dialog';
import { FormEventHandler, useEffect, useState, useRef } from 'react';
import { cn } from '@lib/util/ui-utils';

type PostcodeButtonModalProps = {
  className?: string;
};

export default function PostcodeButtonModal({
  className,
}: PostcodeButtonModalProps) {
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  useEffect(() => {
    setDisplayPostcode(localStorage.getItem(LocalStorageKey.POSTCODE));
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'hidden lg:flex cursor-pointer items-center',
            className
          )}
        >
          <span className="mr-1">
            <MapPinIcon className="w-5 h-5" />
          </span>
          {displayPostcode ||
            dictionary.layout.nav.postcodeModal.showModalButton}
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-xl">
        <div className="flex justify-center items-center mt-4">
          <div>
            <div>
              <h3 className="font-semibold text-xl text-primary">
                {dictionary.layout.nav.postcodeModal.h3}
              </h3>
              <h4 className="text-sm">
                {dictionary.layout.nav.postcodeModal.h4}
              </h4>
            </div>
            <div className="mt-8">
              <form
                onSubmit={onPostcodeSubmit}
                className="flex w-full space-x-3"
                noValidate
              >
                <div className="w-[250px]">
                  <Input
                    label={
                      dictionary.layout.nav.postcodeModal.submitButtonLabel
                    }
                    type="text"
                    name="postcode"
                    autoComplete="off"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary rounded-lg font-raleway text-sm font-bold text-white px-2"
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
      </DialogContent>
    </Dialog>
  );
}
