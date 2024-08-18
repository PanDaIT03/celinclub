import { Button, Col, Form, Row, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import SelectForm from 'components/Select/SelectForm';
import { findAllRetailVisit } from 'state/reducers/retailVisit';
import { getStimulusProducts } from 'state/reducers/stimulusProduct';
import { RootState, useAppDispatch } from 'state/store';
import '../../i18n/index';

const spanCol = 8;

const Admin = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const { t: t_admin } = useTranslation('admin');
  const { t: t_form, i18n } = useTranslation('form');

  const [addressOptions, setAddressOptions] = useState<DefaultOptionType[]>([]);
  const [productOptions, setProductOptions] = useState<DefaultOptionType[]>([]);

  const { data: retailVisits } = useSelector(
    (state: RootState) => state.retailVisit,
  );

  const { data: products } = useSelector(
    (state: RootState) => state.stimulusProduct,
  );

  useEffect(() => {
    i18n.reloadResources();

    dispatch(findAllRetailVisit());
    dispatch(getStimulusProducts());
  }, []);

  useEffect(() => {
    const options: DefaultOptionType[] = products.map((product) => ({
      label: product.name,
      value: product.id,
    }));

    setProductOptions(options);
  }, [products]);

  useEffect(() => {
    setAddressOptions([
      {
        label: t_form('Factory'),
        value: 'Nhà máy/ Factory',
      },
      {
        label: t_form('HCM Office'),
        value: 'Văn phòng HCM/ HCM Office',
      },
      {
        label: t_form('HN Office'),
        value: 'Văn phòng HN/ HN Office',
      },
    ]);
  }, [t_form]);

  const columns: ColumnType[] = [
    {
      width: 50,
      title: 'STT',
      dataIndex: 'stt',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      width: 150,
      dataIndex: 'fullName',
      title: t_admin('Employee Full Name'),
      render: (value) => value || '-',
    },
    {
      width: 170,
      dataIndex: 'phoneNumber',
      title: t_admin('Employee Mobile Number'),
      render: (value) => value || '-',
    },
    {
      width: 100,
      dataIndex: 'officeLocation',
      title: t_admin('Office Location'),
      render: (value) => value || '-',
    },
    {
      width: 150,
      dataIndex: 'retailerName',
      title: t_admin('Retailer Name'),
      render: (value) => value || '-',
    },
    {
      width: 220,
      dataIndex: 'retailerPhoneNumber',
      title: t_admin('Retailer Contact Number'),
      render: (value) => value || '-',
    },
    {
      width: 100,
      dataIndex: 'visitDate',
      title: t_admin('Visit Date'),
      render: (value) => value || '-',
    },
    {
      width: 250,
      dataIndex: 'stimulusProductIds',
      title: t_admin('Cellulite Products'),
      render: (value) => value || '-',
    },
    {
      width: 250,
      dataIndex: 'feedback',
      title: t_admin('Feedback'),
      render: (value) => value || '-',
    },
    {
      width: 190,
      dataIndex: 'upload',
      title: t_admin('Upload Retailer Photo'),
      render: (value) => value || '-',
    },
  ];

  const handleClickCancel = () => {
    console.log('cancel');
    form.resetFields();
  };

  const handleClickFilter = (values: any) => {
    console.log('filter', values);
  };

  return (
    <div className="p-5 mt-3">
      <Form
        form={form}
        size="small"
        layout="vertical"
        autoComplete="off"
        onFinish={handleClickFilter}
        className="w-full bg-white rounded-lg shadow-md p-4 mb-5"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item label={t_admin('Office Location')} name="location">
              <SelectForm
                options={addressOptions}
                placeholder={t_admin('placeHolder.Office Location')}
              />
            </Form.Item>
          </Col>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item label={t_admin('Cellulite Products')} name="product">
              <SelectForm
                options={productOptions}
                placeholder={t_admin('placeHolder.Cellulite Products')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex gap-3 justify-end">
          <Col>
            <Button
              onClick={handleClickCancel}
              className="px-3 py-5 font-medium rounded-md"
            >
              Hủy
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              className="px-3 py-5 font-medium rounded-md bg-[#16548f] text-white hover:!bg-[#16548f] hover:!text-white"
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="bg-white rounded-lg shadow-md">
        <Table
          size="middle"
          columns={columns}
          scroll={{ x: 2000 }}
          className="w-full p-4"
          rowKey={(record) => record.id}
          title={() => <p>Danh sách</p>}
        />
      </Row>
    </div>
  );
};

export default Admin;
