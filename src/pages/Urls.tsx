import useGetUrls from "@/hooks/useGetUrls";
import {
  Table,
  TableBody,
  TableCaption,
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
import { TrashIcon } from "lucide-react";
import { Trash } from "lucide-react";
import { Trash2Icon } from "lucide-react";
const Urls = () => {
  const urls = useGetUrls("6e5d3c58-940f-461f-9363-34dadfd09645");

  if (urls.isLoading) return <p>Loading</p>;
  console.log(urls, "URLS");
  return (
    <div>
      <p>urls</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Id</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Url</TableHead>
            <TableHead className="text-right">ShortUrl</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.data?.response.map((url) => (
            <TableRow key={url.id}>
              <TableCell>{url.id}</TableCell>
              <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
              <TableCell className="w-[400px] overflow-x-auto flex-wrap flex">
                {url.originalUrl}
              </TableCell>
              <TableCell className="text-right">{url.shortUrl}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger className="hover:scale-110">
                    <Trash2Icon />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the url.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
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
