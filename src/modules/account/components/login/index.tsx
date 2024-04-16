import { useFormState } from 'react-dom';

import { LOGIN_VIEW } from '@modules/account/components/login-modal';
import Input from '@modules/common/components/input';
import { logCustomerIn } from '@modules/account/actions';
import ErrorMessage from '@modules/checkout/components/error-message';
import { SubmitButton } from '@modules/common/components/submit-button';
import { useDictionary } from '@lib/context/dictionary-context';
import { SocialLoginButton, SocialPlatform } from '../social-login-button';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null);
  const dictionary = useDictionary();

  return (
    <div className="">
      <div className="mb-8 flex w-full justify-between">
        <h2 className="font-raleway font-bold text-xl">
          {dictionary.account.loginModal.loginHeading}
        </h2>
        <p>
          {dictionary.account.loginModal.switchToRegisterDescription}{' '}
          <button
            className="underline"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          >
            {dictionary.common.register}
          </button>
        </p>
      </div>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label={dictionary.common.email}
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <Input
            label={dictionary.common.password}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <ErrorMessage error={message} />
        <div className="text-right">
          <button
            onClick={(event) => {
              event.preventDefault();
            }}
            className="text-sm underline"
          >
            {dictionary.account.loginModal.troubleLoggingIn}
          </button>
        </div>
        <SubmitButton className="w-full mt-6 font-semibold font-raleway bg-primary-default hover:bg-primary-600">
          {dictionary.account.loginModal.loginButton}
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

export default Login;
