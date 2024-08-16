import { Col, Form, Image, Input, Row } from 'antd';

import { useForm } from 'antd/es/form/Form';
import { Freepik_Br, Star_Benko } from 'assets/images';
import Banner from 'layouts/Banner';

const Home = () => {
  const [form] = useForm();

  return (
    <>
      <Banner />
      <Row className="flex p-2.5 gap-5">
        <Col className="flex-1 max-w-[897px] !p-2.5">
          <Row>
            <h2 className="w-full text-center">
              <span className="font-rubik font-semibold text-[#1F1F1F] text-[22px]">
                Tải lên chi tiết chuyến thăm bán lẻ của bạn tại đây...
              </span>
              <br />
              <span className="font-roboto font-semibold text-sub text-[22px]">
                Cập nhật kết quả thăm quan tại đây...
              </span>
            </h2>
          </Row>
          <Form form={form} className="p-2.5 border-2 border-[#94CBFF] mt-5">
            <div className="px-[15px]">
              <Form.Item
                name="userName"
                labelCol={{ span: 24 }}
                label="Full Name / Họ và tên nhân viên"
              >
                <Input />
              </Form.Item>
            </div>
          </Form>
        </Col>
        <Col className="max-w-[463px]">
          <div className="w-full flex gap-5 flex-col">
            <Image preview={false} width={386} height={308} src={Freepik_Br} />
            <Image preview={false} width={386} height={308} src={Star_Benko} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
