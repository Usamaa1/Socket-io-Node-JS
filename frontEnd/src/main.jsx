import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserList from "./userList/UserList";

import "./index.css";
import ChatScreen from "./chatScreen/ChatScreen";
import LoginScreen from "./userAuth/LoginScreen";
import RegisterScreen from "./userAuth/RegisterScreen";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen
  },
  {
    path: "/userList",
    Component: UserList,
  },
  { 
    path: "/chatMessages/:recieverId", 
    Component: ChatScreen 
  },
  {
    path: "/register",
    Component: RegisterScreen
  },
  {
    path: "/login",
    Component: LoginScreen
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
