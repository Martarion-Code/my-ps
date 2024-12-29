import React, { Suspense } from "react";
import Loading from "./loading";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>Dashboard</div>
    </Suspense>
  );
};

export default Page;
