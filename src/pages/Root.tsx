import { Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import MainHeader from 'layouts/Header/MainHeader';
import { RootState } from 'state/store';

const Root = () => {
  const { loading: retailVisitLoading } = useSelector(
    (state: RootState) => state.retailVisit,
  );
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (retailVisitLoading || userLoading) {
      const scrollPosition = window.scrollY;
      const preventScroll = () => {
        window.scrollTo(0, scrollPosition);
      };

      window.addEventListener('scroll', preventScroll);

      return () => {
        window.removeEventListener('scroll', preventScroll);
      };
    }
  }, [retailVisitLoading || userLoading]);

  return (
    <Spin
      spinning={retailVisitLoading || userLoading}
      tip="Loading..."
      style={{
        top: '50%',
        left: '50%',
        position: 'fixed',
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
