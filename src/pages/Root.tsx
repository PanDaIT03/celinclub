import { Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import MainHeader from 'layouts/Header/MainHeader';
import { RootState } from 'state/store';

const Root = () => {
  const { loading } = useSelector((state: RootState) => state.retailVisit);

  useEffect(() => {
    if (loading) {
      const scrollPosition = window.scrollY;

      const preventScroll = () => {
        window.scrollTo(0, scrollPosition);
      };

      window.addEventListener('scroll', preventScroll);

      return () => {
        window.removeEventListener('scroll', preventScroll);
      };
    }
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
      <Layout className="min-h-screen mt-0">
        <MainHeader />
        <Outlet />
      </Layout>
    </Spin>
  );
};

export default Root;
