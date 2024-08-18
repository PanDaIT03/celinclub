import { Button, Col, Form, Image, Input, Row, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IFilterFindAll } from 'apis/retailVisit';
import { FilterIcon, FilterWhiteIcon } from 'assets/svg';
import SelectForm from 'components/Select/SelectForm';
import useQueryParam from 'hooks/useQueryParam';
import { findAllRetailVisit } from 'state/reducers/retailVisit';
import { getStimulusProducts } from 'state/reducers/stimulusProduct';
import { RootState, useAppDispatch } from 'state/store';
import { HocChangePagination } from 'utils/PaginationChange';
import '../../i18n/index';

const spanCol = 8;

const ManagementRetailVisit = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const { t: t_admin } = useTranslation('admin');
  const { t: t_title } = useTranslation('title');
  const { t: t_form, i18n } = useTranslation('form');

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [addressOptions, setAddressOptions] = useState<DefaultOptionType[]>([]);
  const [productOptions, setProductOptions] = useState<DefaultOptionType[]>([]);

  const { data: retailVisits } = useSelector(
    (state: RootState) => state.retailVisit,
  );

  const { data: products } = useSelector(
    (state: RootState) => state.stimulusProduct,
  );

  const queryParam = useQueryParam(),
    page = parseInt(queryParam.get('page') + '') || 1,
    pageSize = parseInt(queryParam.get('page_size') + '') || 10;

  useEffect(() => {
    i18n.reloadResources();
    onFilter();
    dispatch(getStimulusProducts());
  }, []);

  useEffect(() => {
    console.log(t_title('Management Title'));

    document.title = t_title('Management Title');
  }, [t_title, i18n]);

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
      dataIndex: 'stt',
      title: t_admin('Number'),
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
      width: 150,
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
      width: 250,
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
      dataIndex: ['stimulusProducts'],
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
      width: 300,
      dataIndex: 'imageUrls',
      title: t_admin('Upload Retailer Photo'),
      render: (value) => {
        return (
          <div className="flex gap-2">
            {value?.map((item: string, index: number) => (
              <Image key={index} className="max-w-[100px]" src={item} />
            ))}
          </div>
        );
      },
    },
  ];

  const onFilterCancel = () => {
    form.resetFields();
    onFilter();
  };

  const onFilter = (values?: any) => {
    navigate(`?page=1&page_size=${pageSize}`);

    const formatedValues: IFilterFindAll = {
      employeeName: values?.employeeName?.trim(),
      phoneNumber: values?.phoneNumber?.trim(),
      officeLocation: values?.location?.trim(),
      stimulusProduct: values?.product?.trim(),
      ...values,
    };

    dispatch(findAllRetailVisit({ ...formatedValues }));
  };

  return (
    <Row gutter={[8, 16]} justify={'end'} className="p-5 mt-3">
      <Form
        form={form}
        size="small"
        layout="vertical"
        autoComplete="off"
        onFinish={onFilter}
        className={`w-full bg-white rounded-lg shadow-md p-4 ${isOpenFilter ? 'block' : 'hidden'}`}
      >
        <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item
              name="phoneNumber"
              label={t_admin('Employee Mobile Number')}
            >
              <Input
                allowClear={true}
                name="phoneNumber"
                className="h-[40px] rounded-md"
                placeholder={t_admin('placeHolder.Phone Number')}
              />
            </Form.Item>
          </Col>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item
              name="employeeName"
              label={t_admin('Employee Full Name')}
            >
              <Input
                allowClear={true}
                name="employeeName"
                className="h-[40px] rounded-md"
                placeholder={t_admin('placeHolder.Employee Name')}
              />
            </Form.Item>
          </Col>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item label={t_admin('Office Location')} name="location">
              <SelectForm
                size="middle"
                options={addressOptions}
                className="h-[40px] rounded-md"
                placeholder={t_admin('placeHolder.Office Location')}
              />
            </Form.Item>
          </Col>
          <Col span={spanCol} className="h-[80px]">
            <Form.Item label={t_admin('Cellulite Products')} name="product">
              <SelectForm
                size="middle"
                options={productOptions}
                className="h-[40px] rounded-md"
                placeholder={t_admin('placeHolder.Cellulite Products')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="flex gap-3 justify-end">
          <Col>
            <Button
              onClick={onFilterCancel}
              className="min-w-[72px] px-3 py-5 font-medium rounded-md"
            >
              {t_admin('Cancel')}
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              className="min-w-[87px] px-3 py-5 font-medium rounded-md bg-[#16548f] text-white hover:!bg-[#16548f] hover:!text-white"
            >
              {t_admin('Search')}
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="bg-white rounded-lg shadow-md">
        <Table
          size="middle"
          columns={columns}
          dataSource={retailVisits.items}
          scroll={{ x: 2100 }}
          className="w-full p-4"
          rowKey={(record) => record.id}
          rowClassName={(_, index) => (index % 2 !== 0 ? 'even-row' : '')}
          title={() => (
            <Row justify={'space-between'} align={'middle'}>
              <Col className="text-[14px] leading-[22.4px] font-bold">
                {t_admin('Visit List')}
              </Col>
              <Col>
                <Button
                  onClick={() => setIsOpenFilter(!isOpenFilter)}
                  className={`${isOpenFilter ? 'bg-[#00538f] hover:!bg-[#00538f]' : 'bg-white'}`}
                >
                  {isOpenFilter ? <FilterWhiteIcon /> : <FilterIcon />}
                </Button>
              </Col>
            </Row>
          )}
          pagination={{
            size: 'default',
            current: page,
            total: retailVisits.items?.length ?? 1,
            pageSizeOptions: ['1', '2', '10'],
            showSizeChanger: true,
            onChange: HocChangePagination(),
          }}
        />
      </Row>
    </Row>
  );
};

export default ManagementRetailVisit;
