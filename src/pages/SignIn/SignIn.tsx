import { Button, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../i18n/index';
import { GOOGLE_LOGO } from 'assets/images';

const SignIn = () => {
  const { t } = useTranslation('signIn');

  const handleClickSignIn = () => {
    console.log('sign in');
  };

  return (
    <div className="w-full flex max-w-[500px] bg-white flex-col p-2.5 mt-3 mx-auto gap-3 items-center rounded-md shadow-md">
      <div className="flex gap-2 justify-center items-center">
        <Image preview={false} width={48} height={48} src={GOOGLE_LOGO} />
        <h2 className="font-bold text-[#1f1f1f] text-3xl">{t('Title')}</h2>
      </div>
      <Button
        type="primary"
        className="w-full max-w-40"
        onClick={handleClickSignIn}
      >
        {t('Sign In')}
      </Button>
    </div>
  );
};

export default SignIn;
