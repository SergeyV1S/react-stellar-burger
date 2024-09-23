import { IndexLayout } from "@pages/layouts/main-layout";
import { ProfileLayout } from "@pages/layouts/profile-layout";
import { useAppDispatch } from "@services/store";
import { getUserAction } from "@services/user";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { OnlyAuth, OnlyUnAuth } from "@components/protected-route";

import {
  CurrentIngredientPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  OrderHistoryPage,
  OrderListPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from "./pages";

export const AppRoutes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<IndexLayout />}>
        <Route index element={<HomePage />} />
        <Route path='ingredients/:id' element={<CurrentIngredientPage />} />
        <Route path='order-list' element={<OrderListPage />} />
        <Route path='profile' element={<OnlyAuth element={<ProfileLayout />} />}>
          <Route index element={<OnlyAuth element={<ProfilePage />} />} />
          <Route path='orders' element={<OnlyAuth element={<OrderHistoryPage />} />} />
        </Route>
        <Route path='reset-password' element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
        <Route path='forgot-password' element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
        <Route path='login' element={<OnlyUnAuth element={<LoginPage />} />} />
        <Route path='register' element={<OnlyUnAuth element={<RegisterPage />} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
