import './App.css';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GlobalChat from './components/GlobalChat.jsx';
import { Container } from '@mui/material';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainPage/>}>

      </Route>
    )
  )

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
      <Container>
        <GlobalChat/>
      </Container>
    </>
  );
}

export default App;
