import { IndexLayout } from "@pages/layouts/main-layout";
import { ProfileLayout } from "@pages/layouts/profile-layout";
import { useAppDispatch } from "@services/store";
import { getUserAction } from "@services/user";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { IngredientDetails } from "@components/ingredient-details";
import { Modal } from "@components/modal";
import { OnlyAuth, OnlyUnAuth } from "@components/protected-route";

import { OrderInfo } from "./components/order-info";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  OrderFeedPage,
  OrderHistoryPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from "./pages";

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const state = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  return (
    <>
      <Routes location={state || location}>
        <Route path='/' element={<IndexLayout />}>
          <Route index element={<HomePage />} />
          <Route path='order-feed' element={<OrderFeedPage />} />
          <Route path='order-feed/:orderId' element={<OrderInfo />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />
          <Route path='profile/orders/:orderId' element={<OrderInfo />} />
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

      {state && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:orderId'
            element={
              <Modal>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='order-feed/:orderId'
            element={
              <Modal>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
