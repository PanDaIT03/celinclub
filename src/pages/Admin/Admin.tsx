import { Row, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const { t } = useTranslation('form');

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
      title: 'Họ và tên nhân viên',
      render: (value) => value || '-',
    },
    {
      width: 150,
      dataIndex: 'phoneNumber',
      title: 'SĐT nhân viên',
      render: (value) => value || '-',
    },
    {
      width: 100,
      dataIndex: 'officeLocation',
      title: t('Office Location'),
      render: (value) => value || '-',
    },
    {
      width: 150,
      dataIndex: 'retailerName',
      title: t('Retailer Name'),
      render: (value) => value || '-',
    },
    {
      width: 220,
      dataIndex: 'retailerPhoneNumber',
      title: t('Retailer Contact Number'),
      render: (value) => value || '-',
    },
    {
      width: 100,
      dataIndex: 'visitDate',
      title: t('Visit Date'),
      render: (value) => value || '-',
    },
    {
      width: 150,
      dataIndex: 'stimulusProductIds',
      title: 'Sản phẩm kích cầu',
      render: (value) => value || '-',
    },
    {
      width: 150,
      dataIndex: 'feedback',
      title: 'Nhận xét',
      render: (value) => value || '-',
    },
    {
      width: 170,
      dataIndex: 'upload',
      title: 'Ảnh NT / Hóa đơn / SP đã mua',
      render: (value) => value || '-',
    },
  ];

  return (
    <div className="p-5 mt-3">
      <Row className="bg-white rounded-lg shadow-md">
        <Table
          className="w-full"
          columns={columns}
          scroll={{ x: 2000 }}
          rowKey={(record) => record.id}
          title={() => <p>Danh sách</p>}
        />
      </Row>
    </div>
  );
};

export default Admin;
