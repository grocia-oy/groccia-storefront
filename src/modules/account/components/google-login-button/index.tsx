import { useDictionary } from '@lib/context/dictionary-context';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import GoogleLogo from '@modules/common/icons/google';

type Props = {};

export function GoogleLoginButton({}: Props) {
  const dictionary = useDictionary();

  return (
    <LocalizedClientLink
      href={`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/google`}
    >
      <button
        className="flex w-full items-center px-3 py-3 rounded-lg border-2"
        type="button"
      >
        <GoogleLogo className="absolute" />
        <p className="flex-1 font-bold">
          {dictionary.account.loginModal.socialLoginWithStatement}{' '}
          <span>Google</span>
        </p>
      </button>
    </LocalizedClientLink>
  );
}
