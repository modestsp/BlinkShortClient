import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Urls from "./pages/Urls";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { UserFromJwt } from "./types";
import { toast } from "./components/ui/use-toast";
import jwt_decode from "jwt-decode";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/account",
    element: (
      <Layout>
        <Account />
      </Layout>
    ),
  },
  {
    path: "/urls",
    element: (
      <Layout>
        <Urls />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
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
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    if (jwt) {
      const decodedJwt: UserFromJwt = jwt_decode(jwt);
      const tokenExpirationDate = new Date(decodedJwt.exp * 1000);
      const now = new Date();
      if (tokenExpirationDate < now) {
        setJwt(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
        toast({
          description:
            "Your session has expired. Please log in again. Redirecting...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }
  }, [jwt]);

  if (localStorage.getItem("currentUser")) {
    queryClient.setQueryData(
      ["currentUser"],
      JSON.parse(localStorage.getItem("currentUser")!)
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
