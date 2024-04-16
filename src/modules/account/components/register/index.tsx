'use client';

import { useFormState } from 'react-dom';

import Input from '@modules/common/components/input';
import { LOGIN_VIEW } from '@modules/account/components/login-modal';
import { signUp } from '@modules/account/actions';
import ErrorMessage from '@modules/checkout/components/error-message';
import { SubmitButton } from '@modules/common/components/submit-button';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { useDictionary } from '@lib/context/dictionary-context';
import { SocialLoginButton, SocialPlatform } from '../social-login-button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null);
  const dictionary = useDictionary();

  return (
    <div className="">
      <div className="mb-8 flex w-full justify-between">
        <h2 className="font-raleway font-bold text-xl">
          {dictionary.account.loginModal.registerHeading}
        </h2>
        <p>
          {dictionary.account.loginModal.switchToLoginDescription}{' '}
          <button
            className="underline"
            onClick={() => setCurrentView(LOGIN_VIEW.LOGIN)}
          >
            {dictionary.common.login}
          </button>
        </p>
      </div>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label={dictionary.common.firstName}
            name="first_name"
            required
            autoComplete="given-name"
          />
          <Input
            label={dictionary.common.lastName}
            name="last_name"
            required
            autoComplete="family-name"
          />
          <Input
            label={dictionary.common.email}
            name="email"
            required
            type="email"
            autoComplete="email"
          />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" />
          <Input
            label={dictionary.common.password}
            name="password"
            required
            type="password"
            autoComplete="new-password"
          />
        </div>
        <ErrorMessage error={message} />
        <div className="mt-4">
          <span className="text-sm">
            {dictionary.account.loginModal.registerConsentStarts}{' '}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="underline"
            >
              {dictionary.common.privacyPolicy}
            </LocalizedClientLink>{' '}
            {dictionary.common.and.toLowerCase()}{' '}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="underline"
            >
              {dictionary.common.termsOfUse}
            </LocalizedClientLink>
            .
          </span>
        </div>
        <SubmitButton className="w-full mt-6">
          {dictionary.account.loginModal.registerButton}
        </SubmitButton>
      </form>
      <div className="divider divider-neutral my-8">
        {dictionary.account.loginModal.socialLoginDivider.toLowerCase()}
      </div>
      <div className="space-y-4">
        <div>
          <SocialLoginButton platform={SocialPlatform.GOOGLE} />
        </div>
        <div>
          <SocialLoginButton platform={SocialPlatform.FACEBOOK} />
        </div>
      </div>
    </div>
  );
};

export default Register;
