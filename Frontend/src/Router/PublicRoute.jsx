import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(
    (store) => store.auth
  );

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PublicRoute;