import './App.css';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import AddProject from './pages/AddProject.jsx';
import EditProject from './pages/EditProject.jsx';
import DeleteProject from './pages/DeleteProject.jsx';
import Tasks from './pages/Tasks.jsx';
import Students from './pages/Students.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/Navbar.jsx';
import GlobalChat from './components/GlobalChat.jsx';
import { Container } from '@mui/material';
import GuardedRoute from './components/GuardedRoute.jsx';
import { useEffect, useState } from 'react';
import UserService from './services/UserService.js';

function Layout() {
  const location = useLocation();

  // Paths where GlobalChat won't appear
  const hideGlobalChat = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Navbar />
      <Outlet />
      {!hideGlobalChat && (
        <Container>
          <GlobalChat />
        </Container>
      )}
    </>
  );
}

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GuardedRoute Component={Layout}></GuardedRoute>,
      children: [
        {
          path: "/",
          element: <MainPage />
        },
        {
          path: "/addProject",
          element: <AddProject />
        },
        {
          path: "/editProject/:projectId",
          element: <EditProject />
        },
        {
          path: "/deleteProject/:projectId",
          element: <DeleteProject />
        },
        {
          path: "/tasks/:projectId",
          element: <Tasks />
        },
        {
          path: "/students/:projectId",
          element: <Students />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;