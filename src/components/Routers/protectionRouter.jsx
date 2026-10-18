import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/Authentication/firebaseConfig";
import { Navigate } from "react-router-dom";


export function ProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    // Optionally, show a loading spinner or message while checking auth state
    return <div>Loading...</div>;
  }



  if (!currentUser) {
    // If not signed in, navigate to the login page.
    return <Navigate to="/login" replace />;
  }

  return children;
}
