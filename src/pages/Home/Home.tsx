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
import { Rule } from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import { DefaultOptionType } from 'antd/es/select';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import dayjs from 'dayjs';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

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
import { uploadRetailVisit } from 'state/reducers/retailVisit';
import { getStimulusProducts } from 'state/reducers/stimulusProduct';
import { RootState, useAppDispatch } from 'state/store';
import { inputNumberPatern } from 'utils/constants/constants';
import { icons } from 'utils/constants/icons';
import '../../i18n/index';

type InputFormProps = {
  label: string;
  message?: string;
  component?: ReactNode;
  customeRules?: Rule[];
} & InputProps;

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
  const { t, i18n } = useTranslation('form');
  const { t: t_home } = useTranslation('home');

  const dispatch = useAppDispatch();
  const [form] = useForm<IRetailVisit>();

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const { data } = useSelector((state: RootState) => state.stimulusProduct);

  const [addressOptions, setAddressOptions] = useState<DefaultOptionType[]>([]);
  const [productOptions, setProductOptions] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    i18n.reloadResources();
    dispatch(getStimulusProducts());
  }, []);

  useEffect(() => {
    setAddressOptions([
      {
        label: t('Factory'),
        value: 'Nhà máy/ Factory',
      },
      {
        label: t('HCM Office'),
        value: 'Văn phòng HCM/ HCM Office',
      },
      {
        label: t('HN Office'),
        value: 'Văn phòng HN/ HN Office',
      },
    ]);

    form.setFieldValue('officeLocation', t('Factory'));
  }, [t]);

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
        label: t('Employee Full Name'),
        message: 'Nhập họ và tên nhân viên',
      },
      {
        required: true,
        name: 'phoneNumber',
        label: t('Employee Mobile Number'),
        message: 'Nhập số điện thoại nhân viên',
        customeRules: [
          {
            pattern: inputNumberPatern,
            message: 'Số điện thoại không hợp lệ. Hãy nhập 10 chữ số',
          },
        ],
      },
      {
        name: 'officeLocation',
        label: t('Office Location'),
        component: <Select allowClear={false} options={addressOptions} />,
      },
      {
        required: true,
        name: 'retailerName',
        label: t('Retailer Name'),
        message: 'Nhập tên nhà bán lẻ',
      },
      {
        required: true,
        name: 'retailerPhoneNumber',
        label: t('Retailer Contact Number'),
        message: 'Nhập số liên hệ / SĐT của nhà bán lẻ',
        customeRules: [
          {
            pattern: inputNumberPatern,
            message: 'Số điện thoại không hợp lệ. Hãy nhập 10 chữ số',
          },
        ],
      },
      {
        name: 'retailerAddress',
        label: t('Retail Area'),
      },
      {
        required: true,
        name: 'visitDate',
        label: t('Visit Date'),
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
        label: t('Cellulite Products'),
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
        label: t('Feedback'),
        component: <TextArea rows={4} />,
      },
      {
        name: 'upload',
        label: t('Upload Retailer Photo'),
        customeRules: [
          {
            validator: (_, value, __) => {
              if (value?.fileList.length <= 2) return Promise.resolve();
              return Promise.reject();
            },
            message: 'Hãy tải lên tối đa 2 ảnh',
          },
        ],
        component: (
          <Dragger
            name={'file'}
            multiple={true}
            fileList={fileList}
            accept="image/png, image/jpeg"
            onChange={handleChange}
            beforeUpload={handleBeforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">{t('Drop File')}</p>
            <p className="ant-upload-hint">{t('Max Files Upload')}</p>
          </Dragger>
        ),
      },
    ];
  }, [t, fileList, form, productOptions, addressOptions]);

  const handleSubmit = (values: IRetailVisit) => {
    dispatch(
      uploadRetailVisit({
        ...values,
        visitDate: dayjs(values.visitDate).isValid()
          ? dayjs(values.visitDate).format('DD/MM/YYYY')
          : dayjs(new Date()).format('DD/MM/YYYY'),
        onSuccess: () => {
          setFileList([]);
          form.resetFields();
          form.setFieldValue('officeLocation', 'Nhà máy/ Factory');
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
                {t_home('Upload Retail Visit Details')}
              </span>
              <br />
              <span className="font-roboto font-semibold text-sub text-[22px]">
                {t_home('Update Visit Results')}
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
                  rules={[
                    { required: required, message: message },
                    ...(input.customeRules || []),
                  ]}
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
