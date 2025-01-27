import './App.css';
import {ToastContainer} from 'react-toastify';
import {createBrowserRouter, RouterProvider, Outlet, useLocation} from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import AddProject from './pages/AddProject.jsx';
import EditProject from './pages/EditProject.jsx';
import DeleteProject from './pages/DeleteProject.jsx';
import Tasks from './pages/Tasks.jsx';
import AddTask from './pages/AddTask.jsx';
import Students from './pages/Students.jsx';
import AddStudent from './pages/AddStudent.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './components/Navbar.jsx';
import GlobalChat from './components/GlobalChat.jsx';
import {Container} from '@mui/material';
import GuardedRoute from './components/GuardedRoute.jsx';
import Files from './pages/Files.jsx';
import AddFile from './pages/AddFile.jsx';
import AdminPanel from "./pages/AdminPanel";

function Layout() {
    const location = useLocation();

    // Paths where GlobalChat won't appear
    const hideGlobalChat = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            <Navbar/>
            <Outlet/>
            {!hideGlobalChat && (
                <Container>
                    <GlobalChat/>
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
                    element: <MainPage/>
                },
                {
                    path: "/addProject",
                    element: <AddProject/>
                },
                {
                    path: "/adminPanel",
                    element: <AdminPanel/>
                },
                {
                    path: "/editProject/:projectId",
                    element: <EditProject/>
                },
                {
                    path: "/deleteProject/:projectId",
                    element: <DeleteProject/>
                },
                {
                    path: "/tasks/:projectId",
                    element: <Tasks/>
                },
                {
                    path: "/project/:projectId/tasks/add",
                    element: <AddTask/>
                },
                {
                    path: "/students/:projectId",
                    element: <Students/>
                },
                {
                    path: "/students/:projectId/add",
                    element: <AddStudent/>
                },
                {
                    path: "/files/:projectId",
                    element: <Files/>
                },
                {
                    path: "/project/:projectId/files/add",
                    element: <AddFile/>
                },
            ]
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
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
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
