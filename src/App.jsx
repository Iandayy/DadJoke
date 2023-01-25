import { lazy } from "react";

import Router from "./components/layout/Router";

const Header = lazy(() => import("./components/layout/Header"));
const Footer = lazy(() => import("./components/layout/Footer"));

const App = () => {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;
