import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./components/function/Login"));
const Signup = lazy(() => import("./components/function/Signup"));
const Header = lazy(() => import("./components/layout/Header"));
const Home = lazy(() => import("./components/page/Home"));
const Joke = lazy(() => import("./components/page/Joke"));
const List = lazy(() => import("./components/page/List"));
const Footer = lazy(() => import("./components/layout/Footer"));

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/joke" element={<Joke />} />
        <Route path="/list" element={<List />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
