'use client';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';
import { useIsLogged } from '@modules/business-logic/lib/auth';
import { PAGE_URLS } from '@constants/pages';
import { useRouter } from 'next/navigation';

const StartGuideButton = () => {
  const isLoggedIn = useIsLogged();
  const router = useRouter();
  return (
    <CommonButton
      style="modern-fill"
      onClick={() => {
        isLoggedIn
          ? router.push(PAGE_URLS.ACTIVATE_DEVICE)
          : router.push(PAGE_URLS.AUTH);
      }}
    >
      Bắt đầu ngay
    </CommonButton>
  );
};

export default StartGuideButton;
