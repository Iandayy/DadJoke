import { lazy } from "react";

import Router from "./layout/Router";

const Header = lazy(() => import("./layout/Header"));
const Footer = lazy(() => import("./layout/Footer"));

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
