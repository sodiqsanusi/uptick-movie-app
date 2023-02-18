import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import HomePage from './pages/Homepage';
import Page404 from './pages/Page404';
import SearchPage from './pages/SearchPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Page404 />
  },
  {
    path: '/test',
    element: <App />,
    errorElement: <Page404 />
  },
  {
    path: '/search/:moviename',
    element: <SearchPage />,
    errorElement: <Page404 />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
