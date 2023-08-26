import useGetUrls from "@/hooks/useGetUrls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import { useDeleteUrl } from "@/hooks/useDeleteUrl";

const Urls = () => {
  const urls = useGetUrls(JSON.parse(localStorage.getItem("currentUser")!).id);
  const deleteUrl = useDeleteUrl();

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userInLocalStorage = localStorage.getItem("currentUser");
    if (!userInLocalStorage) {
      navigate("/login");
    }
  }, []);

  const handleCopyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      description: "Copied to clipboard",
      className: "bg-[#0f172a] text-white",
    });
  };

  const handleDeleteUrl = (urlId: number) => {
    deleteUrl.mutateAsync({
      urlId,
      userId: JSON.parse(localStorage.getItem("currentUser")!).id,
    });

    if (deleteUrl.isError) {
      toast({
        description: "Something went wrong",
        className: "bg-red-900 text-white",
      });
    }
  };

  if (urls.isLoading) return <Loader />;

  return (
    <div className="px-2  lg:px-8 w-full">
      <p className="text-white text-2xl mt-4 mb-4 xl:text-2xl xl:font-semibold">
        {" "}
        My Urls
      </p>
      <Table className="text-gray-300 font-bold w-full">
        <TableHeader className="font-extrabold text-base sm:text-lg xl:text-xl">
          <TableRow>
            <TableHead className="hidden sm:table-cell text-white ">
              Id
            </TableHead>
            <TableHead className="hidden sm:table-cell text-white l">
              CreatedAt
            </TableHead>
            <TableHead className="text-white">Url</TableHead>
            <TableHead className="text-right text-white">ShortUrl</TableHead>
            <TableHead className="text-right text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {urls.data?.response.map((url) => (
            <TableRow key={url.id}>
              <TableCell className="hidden sm:table-cell">{url.id}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {new Date(url.createdAt).toLocaleString()}
              </TableCell>
              <TableCell
                onClick={() => handleCopyToClipboard(url.originalUrl)}
                className="w-[150px] sm:w-[200px] xl:w-[800px] cursor-pointer overflow-x-hidden hover:overflow-x-auto flex-wrap flex"
              >
                {url.originalUrl}
              </TableCell>
              <TableCell
                onClick={() =>
                  handleCopyToClipboard(
                    `${import.meta.env.VITE_CLIENT_BASE_URL + url.shortUrl}`
                  )
                }
                className="text-right cursor-pointer"
              >
                {url.shortUrl}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger className="hover:scale-110">
                    <Trash2Icon />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the url.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteUrl(url.id)}
                        className="border"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Urls;
