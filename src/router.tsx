import { IndexLayout } from "@pages/layouts/main-layout";
import { ProfileLayout } from "@pages/layouts/profile-layout";
import { Route, Routes } from "react-router-dom";

import {
  CurrentIngredientPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from "./pages";

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<IndexLayout />}>
      <Route index element={<HomePage />} />
      <Route path='ingredients/:id' element={<CurrentIngredientPage />} />
      <Route path='profile' element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path='order-history' element={<ProfilePage />} />
      </Route>
      <Route path='reset-password' element={<ResetPasswordPage />} />
      <Route path='forgot-password' element={<ForgotPasswordPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Route>
  </Routes>
);
