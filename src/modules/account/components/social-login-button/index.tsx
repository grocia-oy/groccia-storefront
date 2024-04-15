import { FacebookLoginButton } from '../facebook-login-button';
import { GoogleLoginButton } from '../google-login-button';

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

type Props = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialLoginButton({ platform, className }: Props) {
  switch (platform) {
    case SocialPlatform.GOOGLE:
      return <GoogleLoginButton />;
    case SocialPlatform.FACEBOOK:
      return <FacebookLoginButton />;
    default:
      break;
  }
}
