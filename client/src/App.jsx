import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import ContextProvider from "./Context/ContextProvider";
import { Suspense } from "react";
import Loading from "./Components/Loading/Loading";

function App() {
  return (
    <>
      <Suspense fallback={<Loading height="100vh" />}>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </Suspense>
    </>
  );
}

export default App;
