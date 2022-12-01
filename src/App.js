import "./App.css";
import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Main from './components/layout/Main';
import ManageAssignmentPage from './pages/ManageAssignmentPage';
import RequestPage from './pages/RequestPage';
import LoginPage from './pages/Login';

=======
import Main from "./components/layout/Main";
import ManageAssignmentPage from "./pages/ManageAssignment/ManageAssignmentPage";
import RequestPage from "./pages/RequestPage";
import ReportPage from "./pages/ReportPage";
import LoginPage from "./pages/Login";
>>>>>>> 56fa8399f1fb4b621b95002a40cd64288279f1bd

import {
  EditAsset,
  CreateAsset,
  HomePage,
  ManageAsset,
  ManageUserPage,
  CreateAssignment,
} from "./pages";
<<<<<<< HEAD
import EditUserPage from './pages/EditUserPage';
import CreateUserPage from './pages/CreateUserPage';
import ReportPage from './pages/ReportPage';
=======
import EditUserPage from "./pages/EditUserPage";
import CreateUserPage from "./pages/CreateUserPage";
>>>>>>> 56fa8399f1fb4b621b95002a40cd64288279f1bd

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>} />
          <Route element={<Main></Main>}>
            <Route exact path="/" element={<HomePage></HomePage>} />
            <Route
              path="/manage-user"
              element={<ManageUserPage></ManageUserPage>}
            />
            <Route
              path="/manage-user/edit/:id"
              element={<EditUserPage></EditUserPage>}
            />
            <Route
              path="/manage-user/create"
              element={<CreateUserPage></CreateUserPage>}
            />
            <Route path="/manage-asset" element={<ManageAsset></ManageAsset>} />
            <Route
              path="/manage-assignment"
              element={<ManageAssignmentPage></ManageAssignmentPage>}
            />
            <Route
              path="/manage-request"
              element={<RequestPage></RequestPage>}
            />
            <Route path="/report" element={<ReportPage></ReportPage>} />
            <Route path="/create-asset" element={<CreateAsset></CreateAsset>} />
            <Route path="/edit-asset/:id" element={<EditAsset></EditAsset>} />
            <Route
              path="/create-assignment"
              element={<CreateAssignment></CreateAssignment>}
            />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
