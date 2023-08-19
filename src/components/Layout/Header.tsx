import { User } from "@/types";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <header className="flex justify-between items-center text-[#FFFFFF] bg-[#7a62f640] p-4 lg:px-12 xl:px-24 2xl:px-72">
      <p className="text-xl xl:text-2xl font-bold">✂️</p>
      <div className="flex gap-2">
        {!currentUser?.username ? (
          <div className="flex text-semibold gap-5 text-lg ">
            <button className=" ml-2">Login</button>
            <button>Register</button>
          </div>
        ) : (
          <div className="flex gap-5 text-base">
            <DropdownMenu>
              <DropdownMenuTrigger className="border rounded-md px-2 py-1 bg-violet-800 bg-opacity-25 hover:bg-opacity-50 hover:bg-violet-200 font-bold">
                {currentUser?.username}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-violet-200 bg-opacity-25  text-white text-lg">
                <DropdownMenuLabel
                  className="cursor-pointer hover:underline text-base"
                  onClick={() => navigate("/account")}
                >
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="cursor-pointer hover:underline text-base">
                  My Urls
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>{" "}
    </header>
  );
};

export default Header;
