import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Suspense fallback={<p>Loading..</p>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </RecoilRoot>
);
