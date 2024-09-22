import { useAppDispatch } from "@services/store";
import { getUserAction } from "@services/user";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const [isUser, setIsUser] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const init = () => {
    dispatch(getUserAction()).then(() => {
      setIsUser(() => true);
    });
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUser) return null;

  return isUser ? element : <Navigate to='/login' state={{ url: location.pathname }} replace />;
};
