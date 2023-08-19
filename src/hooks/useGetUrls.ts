import { getUrls } from "@/services/url";
import { useQuery } from "react-query";


const useGetUrls = (userId:string) => {
    return useQuery("urls", () => getUrls(userId));
} 

export default useGetUrls