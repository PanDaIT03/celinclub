import { Col, Image, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { HeaderLogo, UK_Flag, VI_Flag } from 'assets/images';

const MainHeader = () => {
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
          <div className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer">
            <Image preview={false} width={24} height={18} src={UK_Flag} />
            <span>EN</span>
          </div>
          <div className="leading-6 flex gap-[5px] justify-center items-center cursor-pointer">
            <Image preview={false} width={24} height={18} src={VI_Flag} />
            <span>VI</span>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
