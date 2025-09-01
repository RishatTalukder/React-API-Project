import { BrowserRouter, Routes, Route } from "react-router";
import React, { Suspense, lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const SingleCocktail = lazy(() => import("./pages/SingleCocktail"));
const Error = lazy(() => import("./pages/Error"));
import SharedLayout from "./layout/SharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cocktail/:id" element={<SingleCocktail />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
