import { Navigate } from "react-router-dom";

export default function AdminProtection({ children }) {
  if (true) {
    {
      return children;
    }
  } else {
    return <Navigate to={"/not-authorized"} replace />;
  }
}
