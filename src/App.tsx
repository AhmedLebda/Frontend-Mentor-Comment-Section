import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Replies from "./pages/Replies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Something Went Wrong</h1>,
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
