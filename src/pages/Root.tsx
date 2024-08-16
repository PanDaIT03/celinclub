import { Layout } from 'antd';
import MainHeader from 'layouts/Header/MainHeader';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <Layout className="bg-white min-h-screen mt-0">
      <MainHeader />
      <Outlet />
    </Layout>
  );
};

export default Root;
