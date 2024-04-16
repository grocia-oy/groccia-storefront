import { useDictionary } from '@lib/context/dictionary-context';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import FacebookLogo from '@modules/common/icons/facebook';

type Props = {};

export function FacebookLoginButton({}: Props) {
  const dictionary = useDictionary();

  return (
    <LocalizedClientLink
      href={`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/facebook`}
    >
      <button
        className="flex w-full items-center px-3 py-3 rounded-lg border-2 bg-[#1877F2]"
        type="button"
      >
        <FacebookLogo className="absolute" />
        <p className="flex-1 font-bold text-white">
          {dictionary.account.loginModal.socialLoginWithStatement}{' '}
          <span>Facebook</span>
        </p>
      </button>
    </LocalizedClientLink>
  );
}
