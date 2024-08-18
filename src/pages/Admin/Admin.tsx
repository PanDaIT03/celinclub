import { Row, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import useQueryParam from 'hooks/useQueryParam';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { findAllRetailVisit } from 'state/reducers/retailVisit';
import { RootState, useAppDispatch } from 'state/store';
import { HocChangePagination } from 'utils/PaginationChange';

const Admin = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('form');

  const { data: retailVisits } = useSelector(
    (state: RootState) => state.retailVisit,
  );

  const queryParam = useQueryParam(),
    page = parseInt(queryParam.get('page') + '') || 1,
    pageSize = parseInt(queryParam.get('page_size') + '') || 10;

  useEffect(() => {
    const { items } = retailVisits;

    dispatch(
      findAllRetailVisit({
        // pagination: {
        //   pageSize: pageSize,
        //   startAfter: items[items.length - 1],
        // },
        // officeLocation: 'Văn phòng HCM/ HCM Office',
        visitDate: '29/08/2024',
      }),
    );
  }, []);
  // }, [page, pageSize]);

  console.log(retailVisits);

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
      width: 150,
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
      width: 250,
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
      dataIndex: ['stimulusProducts'],
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
      width: 300,
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
          dataSource={retailVisits.items}
          scroll={{ x: 2100 }}
          rowKey={(record) => record.id}
          title={() => <p>Danh sách</p>}
          pagination={{
            // current: 1,
            pageSize: 10,
            total: retailVisits.pageInfo?.totalItems,
            pageSizeOptions: ['1', '2', '10'],
            showSizeChanger: true,
            onChange: HocChangePagination(),
          }}
        />
      </Row>
    </div>
  );
};

export default Admin;
