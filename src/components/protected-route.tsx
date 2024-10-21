import { useAppSelector } from "@services/store";
import { getUserStore } from "@services/user";
import { Navigate, useLocation } from "react-router-dom";

import "../index.css";

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: React.ReactNode;
}

const ProtectedRoute = ({ onlyUnAuth = false, element }: IProtectedRouteProps) => {
  const { user } = useAppSelector(getUserStore);
  const location = useLocation();

  if (!onlyUnAuth && !user.email) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user.email) {
    const { from } = location.state ?? { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ element }: Omit<IProtectedRouteProps, "onlyUnAuth">) => (
  <ProtectedRoute onlyUnAuth={true} element={element} />
);
