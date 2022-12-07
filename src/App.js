import "./App.css";
import { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import ManageAssignmentPage from "./pages/ManageAssignment/ManageAssignmentPage";
import RequestPage from "./pages/RequestForReturningPage/RequestPage";

import LoginPage from "./pages/Login";

import {
  EditAsset,
  CreateAsset,
  HomePage,
  ManageAsset,
  ManageUserPage,
  EditAssignmentPage,
  CreateAssignment,
} from "./pages";
import EditUserPage from "./pages/EditUserPage";
import CreateUserPage from "./pages/CreateUserPage";
import ReportPage from "./pages/ReportPage";

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
              path="/manage-asset/create-asset"
              element={<CreateAsset></CreateAsset>}
            />
            <Route
              path="/manage-assignment"
              element={<ManageAssignmentPage></ManageAssignmentPage>}
            />
            <Route
              path="/manage-request"
              element={<RequestPage></RequestPage>}
            />
            <Route path="/report" element={<ReportPage></ReportPage>} />
            <Route
              path="/manage-asset/edit-asset/:id"
              element={<EditAsset></EditAsset>}
            />
            <Route
              path="/manage-assignment/create-assignment"
              element={<CreateAssignment></CreateAssignment>}
            />
            <Route
              path="/manage-assignment/edit-assignment/:id"
              element={<EditAssignmentPage></EditAssignmentPage>}
            />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
