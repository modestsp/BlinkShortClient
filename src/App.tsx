import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import jwt_decode from "jwt-decode";

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function App() {
  // const [currentUser, setCurrentUser] = useState<string | null>(null);

  // const login = async () => {
  //   const response = await fetch("http://localhost:5077/user/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({

  //     }),
  //   });
  //   return response;
  // };

  // useEffect(() => {
  //   login()
  //     .then((response) => response.json())
  //     .then((data) => setCurrentUser(jwt_decode(data.response).username));
  //   localStorage.setItem("currentUser", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
