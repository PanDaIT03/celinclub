import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  InputProps,
  Row,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DefaultOptionType } from 'antd/es/select';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { Freepik_Br, Star_Benko } from 'assets/images';
import FormComp from 'components/Form/Form';
import Select from 'components/Select/Select';
import Banner from 'layouts/Banner';
import { uploadRetailVisit } from 'state/reducers/retailVisit';
import { useAppDispatch } from 'state/store';
import { icons } from 'utils/constants/icons';

type InputFormProps = {
  label: string;
  message?: string;
  component?: ReactNode;
} & InputProps;

const addressOptions: DefaultOptionType[] = [
  {
    label: 'Nhà máy/ Factory',
    value: 'factory',
  },
  {
    label: 'Văn phòng HCM',
    value: 'HCM Office',
  },
  {
    label: 'Văn phòng HN',
    value: 'HN Office',
  },
];

const brandOptions: DefaultOptionType[] = [
  { label: 'STAR Đau họng (xanh lá)', value: 'STAR Đau họng (xanh lá)' },
  { label: 'Giảm ho STAR (cam)', value: 'Giảm ho STAR (cam)' },
  { label: 'Dizzo Hiệu quả. (Sủi)', value: 'Dizzo Hiệu quả. (Sủi)' },
  { label: 'canxilife', value: 'canxilife' },
  { label: 'Ameflu DT+C', value: 'Ameflu DT+C' },
  { label: 'Gói Tydol', value: 'Gói Tydol' },
  { label: 'Xi-rô cây thường xuân STAR', value: 'Xi-rô cây thường xuân STAR' },
  { label: 'Nhai chóng mặt', value: 'Nhai chóng mặt' },
  { label: 'Dizzo Lacto', value: 'Dizzo Lacto' },
  { label: 'Centovit', value: 'Centovit' },
  { label: 'Tydol Nữ', value: 'Tydol Nữ' },
  { label: 'amip', value: 'amip' },
];

const { TextArea } = Input,
  { CloudUploadOutlined } = icons;

const Home = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleBeforeUpload = useCallback(() => {
    return false;
  }, []);

  const handleChange = useCallback(
    ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
      setFileList(fileList);
    },
    [],
  );

  const inputs: InputFormProps[] = useMemo(() => {
    return [
      {
        required: true,
        name: 'fullName',
        message: 'Nhập họ và tên nhân viên',
        label: 'Full Name / Họ và tên nhân viên',
      },
      {
        required: true,
        name: 'phoneNumber',
        message: 'Nhập họ và tên nhân viên',
        label: 'Số điện thoại di động của nhân viên / Số ĐTDĐ của nhân viên',
      },
      {
        name: 'officeLocation',
        label: 'Địa chỉ văn phòng / Nơi làm việc',
        component: <Select options={addressOptions} />,
      },
      {
        required: true,
        name: 'retailerName',
        label: 'Tên nhà bán lẻ',
        message: 'Nhập tên nhà bán lẻ',
      },
      {
        required: true,
        name: 'retailerPhoneNumber',
        label: 'Số liên hệ nhà bán lẻ / Số ĐT của nhà bán lẻ',
        message: 'Nhập Số liên hệ nhà bán lẻ / / Số ĐT của nhà bán lẻ',
      },
      {
        name: 'retailerAddress',
        label: 'Khu vực bán lẻ/Quận/Địa chỉ nhà bán lẻ',
      },
      {
        required: true,
        label: 'Ngày thăm',
        name: 'visitDate',
        message: 'Chọn ngày thăm',
        component: (
          <DatePicker
            picker="date"
            inputReadOnly
            className="w-full"
            format={{ format: 'DD/MM/YYYY' }}
          />
        ),
      },
      {
        name: 'stimulusProductIds',
        label: 'Thương hiệu có sẵn / Sản phẩm kích cầu',
        component: (
          <Checkbox.Group className="w-full">
            <Row gutter={[8, 16]}>
              {brandOptions.map((brand, index) => (
                <Col key={index} span={12}>
                  <Checkbox value={brand.value}>{brand.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        ),
      },
      {
        name: 'feedback',
        label: 'Nhận xét / Phản hồi / Tóm tắt nội dung',
        component: <TextArea rows={4} />,
      },
      {
        required: true,
        name: 'upload',
        message: 'Hãy tải ảnh của bạn',
        label: 'Upload Retailer Photo / Tải ảnh NT, hóa đơn, SP đã mua',
        component: (
          <Dragger
            name={'file'}
            multiple={true}
            fileList={fileList}
            accept="image/png, image/jpeg"
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">
              Thả tập tin của bạn ở đây hoặc bấm vào đây để tải lên
            </p>
            <p className="ant-upload-hint">
              Bạn có thể tải lên tối đa 2 tập tin.
            </p>
          </Dragger>
        ),
      },
    ];
  }, [fileList]);

  const handleSubmit = (values: IRetailVisit) => {
    dispatch(
      uploadRetailVisit({
        ...values,
        visitDate: dayjs(values.visitDate).format('DD/MM/YYYY'),
      }),
    );
  };

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
          <FormComp
            form={form}
            className="p-2.5 border-2 border-[#94CBFF] mt-5"
            onFinish={handleSubmit}
          >
            {inputs.map((input, index) => {
              const { name, label, required, message, component } = input;

              return (
                <Form.Item
                  key={index}
                  name={name}
                  label={label}
                  labelCol={{ span: 24 }}
                  rules={[{ required: required, message: message }]}
                >
                  {component ? component : <Input name={name} />}
                </Form.Item>
              );
            })}
          </FormComp>
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
