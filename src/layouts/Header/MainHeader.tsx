import { LoginOutlined } from '@ant-design/icons';
import { Col, Image, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HeaderLogo } from 'assets/images';
import { EN_Flag, VI_Flag } from 'assets/svg';
import Icon from 'components/Icon/Icon';
import { signIn, signInWithGooglePopup, signOut } from 'state/reducers/user';
import { RootState, useAppDispatch } from 'state/store';
import '../../i18n/index';
import path from '../../routes/path';

type MenuItem = Required<MenuProps>['items'][number];

const MainHeader = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useAppDispatch();

  const headerRef = useRef<any>(null);
  // const isAdminPage = location.pathname.startsWith('/management');

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('header');

  const { user } = useSelector((state: RootState) => state.user);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isViLanguage, setIsViLanguage] = useState(true);

  useEffect(() => {
    setIsViLanguage(currentLanguage === 'vi');
  }, [currentLanguage]);

  useEffect(() => {
    const userJSON = localStorage.getItem('currentUser');
    if (userJSON === null) return;

    dispatch(signIn(JSON.parse(userJSON) as IUser));
    if (user?.role === 'admin') navigate(path.MANAGEMENTRETAILVISIT);
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
      dispatch(signInWithGooglePopup({ navigate }));
      return;
    }

    navigate(path.ROOT);
    dispatch(signOut());
  }, [user]);

  // const items: MenuItem[] = useMemo(() => {
  //   return [
  //     {
  //       key: 'user',
  //       label: user?.displayName,
  //       children: [
  //         {
  //           key: 'logOut',
  //           icon: <LoginOutlined />,
  //           label: <span className="text-sm font-bold">{t('Sign out')}</span>,
  //           onClick: handleClickLogin,
  //         },
  //       ],
  //     },
  //   ];
  // }, [t, user]);

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
        <Col className="w-full h-full max-w-[300px] p-2.5 leading-none">
          <Image
            preview={false}
            src={HeaderLogo}
            height={'100%'}
            className="max-h-[148px] max-w-[300px] object-contain cursor-pointer"
            onClick={() => navigate(path.ROOT)}
          />
        </Col>
        <Col className="flex items-center">
          <div className="flex items-start gap-2">
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
          </div>
          {user && <div className="text-sm font-bold">{user.displayName}</div>}
          {/* {isAdminPage && (
            <div>
              {user ? (
                <Menu
                  items={items}
                  mode="horizontal"
                  className="min-w-[129px] h-[60px] text-sm font-bold !border-0"
                />
              ) : (
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  className="min-w-[129px] text-sm font-bold hover:!text-[#00538f] hover:!bg-transparent"
                  onClick={handleClickLogin}
                >
                  {t('Sign in')}
                </Button>
              )}
            </div>
          )} */}
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
