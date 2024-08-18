import { Col, Image, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { HeaderLogo } from 'assets/images';
import { EN_Flag, VI_Flag } from 'assets/svg';
import Icon from 'components/Icon/Icon';
import '../../i18n/index';
import path from '../../routes/path';

const languageOptions: DefaultOptionType[] = [
  { label: 'English', value: 'en' },
  { label: 'Tiếng Việt', value: 'vi' },
];

const MainHeader = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isViLanguage, setIsViLanguage] = useState(true);

  useEffect(() => {
    setIsViLanguage(currentLanguage === 'vi');
  }, [currentLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        const isScrolleY = window.scrollY <= 50;
        setIsScrolled(!isScrolleY);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Header
      style={{ height: isScrolled ? '60px' : '148px' }}
      className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-md`}
    >
      <Row justify="space-between" className="h-full px-2.5">
        <Col className="w-full h-full max-w-[1140px] p-2.5 mx-auto leading-none">
          <Image
            preview={false}
            src={HeaderLogo}
            height={'100%'}
            className="max-h-[148px] max-w-[500px] object-contain cursor-pointer"
            onClick={() => navigate(path.ROOT)}
          />
        </Col>
        {/* <Select
          allowClear={false}
          showSearch={false}
          options={languageOptions}
          className="w-40 fixed top-[15px] right-[15px] z-50"
          onChange={handleChangeLanguage}
        /> */}
        <Col className="fixed flex items-start gap-2 top-[15px] right-[15px] z-50">
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
      </Row>
    </Header>
  );
};

export default MainHeader;
