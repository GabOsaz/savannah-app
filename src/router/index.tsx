import Users from "../pages/users";
import UserDetail from "../pages/users/[id]";
import Layout from "../components/Layout";

import { Route, BrowserRouter, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;
