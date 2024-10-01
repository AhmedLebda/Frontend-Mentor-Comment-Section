import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Replies from "./pages/Replies";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Replies />
      }
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
