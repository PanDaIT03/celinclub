import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Admin from 'pages/Admin/Admin';
import Home from 'pages/Home/Home';
import ProtectedRoute from 'pages/Root';
import path from './path';
import Admin from 'pages/Admin/Admin';

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
          path: `${path.ADMIN}`,
          element: <Admin />,
        },
      ],
    },
    {
      path: `${path.ADMIN}`,
      element: <ProtectedRoute />,
      children: [
        {
          path: ``,
          element: <Admin />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
