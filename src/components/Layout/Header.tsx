import { User } from "@/types";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const queryClient = useQueryClient();
  useEffect(() => {
    const cachedUser = queryClient.getQueryData<User | null>(["currentUser"]);

    if (cachedUser) {
      console.log("CACHED USER FOUNDED");
      setCurrentUser(cachedUser);
      console.log("CURRENT USER HEADER CACHED", currentUser);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("currentUser")!);
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
  }, [queryClient, currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("jwt");
    queryClient.invalidateQueries({ queryKey: "currentUser" });
    queryClient.removeQueries("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center text-[#FFFFFF] bg-[#7a62f640] p-4">
      <p className="text-xl">✂️</p>
      <div className="flex gap-2">
        {!currentUser?.username ? (
          <div className="flex  gap-5 text-xl">
            <button className="font-bold ml-2">Login</button>
            <button>Register</button>
          </div>
        ) : (
          <div className="flex gap-2 text-xl">
            <p>{currentUser?.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
