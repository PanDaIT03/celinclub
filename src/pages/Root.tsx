import { Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import MainHeader from 'layouts/Header/MainHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'state/store';

const Root = () => {
  const { loading } = useSelector((state: RootState) => state.retailVisit);

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <Spin
      spinning={loading}
      tip="Loading..."
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <Layout className="bg-white min-h-screen mt-0">
        <MainHeader />
        <Outlet />
      </Layout>
    </Spin>
  );
};

export default Root;
