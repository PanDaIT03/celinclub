import { LoginOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { HeaderLogo } from 'assets/images';
import { EN_Flag, VI_Flag } from 'assets/svg';
import Icon from 'components/Icon/Icon';
import { auth } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { signInWithGooglePopup, signOut } from 'state/reducers/user';
import { RootState, useAppDispatch } from 'state/store';
import '../../i18n/index';
import path from '../../routes/path';

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headerRef = useRef<any>(null);

  const { user } = useSelector((state: RootState) => state.user);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const { t } = useTranslation('header');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isViLanguage, setIsViLanguage] = useState(true);

  useEffect(() => {
    setIsViLanguage(currentLanguage === 'vi');
  }, [currentLanguage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User logged in:', currentUser);
      } else {
        console.log('User not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        const isScrolledY =
          window.scrollY - headerRef.current.clientHeight <= 50;
        setIsScrolled(!isScrolledY);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerRef]);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  const handleClickLogin = useCallback(() => {
    if (typeof user === 'undefined') {
      dispatch(signInWithGooglePopup());
      return;
    }

    navigate(path.ROOT);
    dispatch(signOut());
  }, [user]);

  console.log(user);

  return (
    <Header
      ref={headerRef}
      style={{ height: isScrolled ? '60px' : '100px' }}
      className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md`}
    >
      <Row
        gutter={[6, 12]}
        align={'middle'}
        justify="space-between"
        className="h-full px-2.5"
      >
        <Col className="w-full h-full max-w-[800px] p-2.5 mx-auto leading-none">
          <Image
            preview={false}
            src={HeaderLogo}
            height={'100%'}
            className="max-h-[148px] max-w-[500px] object-contain cursor-pointer"
            onClick={() => navigate(path.ROOT)}
          />
        </Col>
        <Col className="flex items-start gap-2">
          <div
            className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer"
            onClick={() => handleChangeLanguage('en')}
          >
            <Icon svgIcon={<EN_Flag />} />
            <span className={!isViLanguage ? 'font-bold text-[#1b43ef]' : ''}>
              EN
            </span>
          </div>
          <div
            className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer"
            onClick={() => handleChangeLanguage('vi')}
          >
            <Icon svgIcon={<VI_Flag />} />
            <span className={isViLanguage ? 'font-bold text-[#1b43ef]' : ''}>
              VI
            </span>
          </div>
        </Col>
        <Col>
          <Button
            type="text"
            className="min-w-[129px] text-sm font-bold hover:!text-[#00538f] hover:!bg-transparent"
            onClick={handleClickLogin}
          >
            {typeof user === 'undefined' ? (
              <>
                <LoginOutlined />
                {t('Sign in')}
              </>
            ) : (
              <>
                <LoginOutlined />
                Đăng xuất
              </>
            )}
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
