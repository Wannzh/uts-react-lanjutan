import { useOutletContext, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Grab the user object provided by Layout
  const { user } = useOutletContext();

  // If user is not authenticated, redirect to forbidden (403)
  if (!user) {
    return <Navigate to="/forbidden" replace />;
  }

  // Otherwise, render the protected component
  return children;
}
