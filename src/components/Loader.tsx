import { Skeleton } from "./ui/skeleton";

const Loader = () => {
  return (
    <Skeleton className="self-center h-[40px] text-4xl bg-transparent rounded-full">
      ✂️
    </Skeleton>
  );
};

export default Loader;
