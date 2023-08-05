import { useQueryClient } from "react-query";
import { useLogin } from "../hooks/useLogin";

const Home = () => {
  const login = useLogin();
  const queryClient = useQueryClient();

  if (login.isLoading) return <p>Loading...</p>;
  if (login.isError) return <p>Error</p>;

  console.log(login.data);
  console.log("SAVED DATA", queryClient.getQueryData("currentUser"));
  return (
    <header>
      <button onClick={() => login.mutateAsync({})}>LOGIN</button>
      <p>Register</p>
      <button onClick={() => localStorage.removeItem("currentUser")}>
        logout
      </button>
    </header>
  );
};

export default Home;
