import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home/Home';
import ProtectedRoute from 'pages/Root';
import path from './path';

const Router = () => {
  const routes = [
    {
      path: `${path.ROOT}`,
      element: <ProtectedRoute />,
      children: [
        {
          path: ``,
          element: <Home />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
