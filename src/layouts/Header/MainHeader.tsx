import { Col, Image, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useTranslation } from 'react-i18next';

import { HeaderLogo } from 'assets/images';
import { EN_Flag, VI_Flag } from 'assets/svg';
import Icon from 'components/Icon/Icon';
import '../../i18n/index';

const MainHeader = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng);
  };

  return (
    <Header className="h-full bg-white px-2.5 border-2 border-[#97C8FF]">
      <Row justify="space-between" className="px-2.5">
        <Col className="w-full max-w-[1140px] h-max p-2.5 mx-auto leading-none">
          <Image
            preview={false}
            src={HeaderLogo}
            className="max-w-[500px] max-h-[157px] object-contain"
          />
        </Col>
        <Col className="fixed flex items-start gap-2 top-[15px] right-[15px] z-50">
          <div
            className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer"
            onClick={() => handleChangeLanguage('en')}
          >
            <Icon svgIcon={<EN_Flag />} />
            <span>EN</span>
          </div>
          <div
            className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer"
            onClick={() => handleChangeLanguage('vi')}
          >
            <Icon svgIcon={<VI_Flag />} />
            <span>VI</span>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
