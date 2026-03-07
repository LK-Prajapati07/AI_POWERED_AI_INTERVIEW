import React from "react";
import AppRoutes from "./Router/AppRoutes";
import { useGetCurrentUser } from "./Hooks/auth.hooks";


const App = () => {
  useGetCurrentUser()
  return <AppRoutes />;
};

export default App;
