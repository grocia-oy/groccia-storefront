import { Heading, Text } from '@medusajs/ui';
import Button from '@modules/common/components/button';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

const SignInPrompt = ({ dictionary }: { dictionary: any }) => {
  const dictionarySignInPrompt = dictionary.cartPage.signInPrompt;

  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {dictionarySignInPrompt.title}
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          {dictionarySignInPrompt.description}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button className="h-10">{dictionarySignInPrompt.signIn}</Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
