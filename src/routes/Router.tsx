import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home/Home';
import ManagementRetailVisit from 'pages/ManagementRetailVisit/ManagementRetailVisit';
import ProtectedRoute from 'pages/Root';
import SignIn from 'pages/SignIn/SignIn';
import path from './path';

const Router = () => {
  const routes = [
    {
      path: `${path.ROOT}`,
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: `${path.SIGNIN}`,
          element: <SignIn />,
        },
        {
          path: `${path.MANAGEMENTRETAILVISIT}`,
          element: <ManagementRetailVisit />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
