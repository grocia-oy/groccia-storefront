import { Heading } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import React from 'react';

const Help = ({ dictionary }: { dictionary: any }) => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{dictionary.help.needHelp}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">
              {dictionary.common.contact}
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {dictionary.help.returnAndExchanges}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
