import Loader from "@/components/Loader";
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
    <div className="flex text-lg justify-center mt-8">
      {/* <Sidebar /> */}
      <div className="flex flex-col">
        <p className="text-white text-2xl font-bold mb-4 ml-2">
          Account details
        </p>
        {currentUser ? (
          Object.entries(currentUser).map(([key, value]) => (
            <div
              className="border text-white flex rounded-md gap-2 mb-2 p-4 justify-between"
              key={key}
            >
              <p className="mr-4">{key}</p>
              <p>{value}</p>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Account;
