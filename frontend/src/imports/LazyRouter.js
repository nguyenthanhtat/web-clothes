import React, { lazy } from "react";
export const Home = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import("../pages/Home/Home")), 2000);
    });
  });
export const Login = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(import("../pages/Authentication/Login")), 1000);
    });
  });