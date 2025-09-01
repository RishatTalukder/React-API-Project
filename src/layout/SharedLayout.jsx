import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Loading from "../components/Loading";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
