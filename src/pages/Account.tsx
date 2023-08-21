import Sidebar from "@/components/Sidebar";
import { User } from "@/types";
import { useEffect, useState } from "react";

const Account = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("currentUser")!);
    console.log("USER IN LOCAL STORAGE", userInLocalStorage);
    setCurrentUser(userInLocalStorage);
    console.log("CURRENT USER IN ACC", currentUser);
  }, []);

  return (
    <div className="border flex h-1/2 text-lg justify-center">
      <Sidebar />
      <div className="flex flex-col">
        <p className="text-white mb-4 ml-2">My account</p>
        {currentUser ? (
          Object.entries(currentUser).map(([key, value]) => (
            <div
              className="border text-white flex p-2 justify-between"
              key={key}
            >
              <p className="mr-4">{key}</p>
              <p>{value}</p>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default Account;
