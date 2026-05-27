import { Navigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default MainLayout;
