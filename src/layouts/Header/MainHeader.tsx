import { Col, Image, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { HeaderLogo } from 'assets/images';
import { UK_Flag } from 'assets/svg';

const MainHeader = () => {
  return (
    <Header className="flex h-full px-2.5 bg-white justify-end items-center">
      <Row gutter={[8, 16]} justify={'space-between'}>
        <Col span={1}></Col>
        <Col span={12} className="w-full px-2.5">
          <Image preview={false} src={HeaderLogo} />
        </Col>
        <Col span={1}>
          <UK_Flag />
        </Col>
      </Row>
    </Header>
  );
};

export default MainHeader;
