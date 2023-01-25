import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../../components/page/Home"));
const Joke = lazy(() => import("../../components/page/Joke"));
const List = lazy(() => import("../../components/page/List"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/joke" element={<Joke />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
};

export default Router;
