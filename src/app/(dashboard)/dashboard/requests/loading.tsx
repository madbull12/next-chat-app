import { Skeleton } from "@/components/ui/Skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="space-y-4 ml-[25%] p-4">
      <Skeleton className="w-[100px] h-[30px] " />

      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div key={i} >
            <div className="flex items-start gap-x-2">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
              <div>
                <Skeleton className="w-[100px] h-[30px] " />
                <Skeleton className="w-[150px] h-[20px] " />
                <Skeleton className="w-[80px] h-[40px] " />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Loading;
