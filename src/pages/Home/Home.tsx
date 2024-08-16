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
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import {
  Ame_Bismo,
  Ameflu_Green,
  Ameflu_Orange,
  Calci_Life,
  Centovit,
  Dizzo,
  Rewards,
  Star_Brown,
  Star_Dark_Blue,
  Star_Green,
  Tydol_Women,
  VN_Brand_Banner_3,
} from 'assets/images';
import BackToTop from 'components/BackToTop/BackToTop';
import FormComp from 'components/Form/Form';
import Select from 'components/Select/Select';
import Banner from 'layouts/Banner';
import { useSelector } from 'react-redux';
import { uploadRetailVisit } from 'state/reducers/retailVisit';
import { getStimulusProducts } from 'state/reducers/stimulusProduct';
import { RootState, useAppDispatch } from 'state/store';
import { icons } from 'utils/constants/icons';

type InputFormProps = {
  label: string;
  message?: string;
  component?: ReactNode;
} & InputProps;

const addressOptions: DefaultOptionType[] = [
  {
    label: 'Nhà máy/ Factory',
    value: 'Nhà máy/ Factory',
  },
  {
    label: 'Văn phòng HCM/ HCM Office',
    value: 'Văn phòng HCM/ HCM Office',
  },
  {
    label: 'Văn phòng HN/ HN Office​',
    value: 'Văn phòng HN/ HN Office​',
  },
];

const images = [
  {
    id: 1,
    src: Star_Green,
  },
  {
    id: 2,
    src: Star_Brown,
  },
  {
    id: 3,
    src: Star_Dark_Blue,
  },
  {
    id: 4,
    src: Dizzo,
  },
  {
    id: 5,
    src: Calci_Life,
  },
  {
    id: 6,
    src: Centovit,
  },
  {
    id: 7,
    src: Tydol_Women,
  },
  {
    id: 8,
    src: Ameflu_Orange,
  },
  {
    id: 9,
    src: Ameflu_Green,
  },
  {
    id: 10,
    src: Ame_Bismo,
  },
];

const { TextArea } = Input,
  { CloudUploadOutlined } = icons;

const Home = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm<IRetailVisit>();

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const { data } = useSelector((state: RootState) => state.stimulusProduct);

  const [productOptions, setProductOptions] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    const fieldsValue = {
      officeLocation: 'Nhà máy/ Factory',
    };

    form.setFieldsValue(fieldsValue);
    dispatch(getStimulusProducts());
  }, []);

  useEffect(() => {
    const options: DefaultOptionType[] = data.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    setProductOptions(options);
  }, [data]);

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
        component: <Select allowClear={false} options={addressOptions} />,
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
              {productOptions.map((brand, index) => (
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
  }, [fileList, form, productOptions]);

  const handleSubmit = (values: IRetailVisit) => {
    dispatch(
      uploadRetailVisit({
        ...values,
        visitDate: dayjs(values.visitDate).format('DD/MM/YYYY'),
        onSuccess: () => {
          setFileList([]);
          form.resetFields();
        },
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
            onFinish={handleSubmit}
            className="mt-5 p-2.5 border-2 border-[#94CBFF] rounded-md"
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
            {images.map((image) => (
              <Image
                key={image.id}
                width={386}
                height={308}
                preview={false}
                src={image.src}
                className="object-contain"
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 20]}>
        <Row className="w-full max-w-[1140px] mx-auto">
          <Image preview={false} src={Rewards} />
        </Row>
        <Row className="w-full max-w-[1140px] mx-auto pb-2.5">
          <Image preview={false} src={VN_Brand_Banner_3} />
        </Row>
      </Row>
      <BackToTop />
    </>
  );
};

export default Home;
