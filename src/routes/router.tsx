import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "../App";
import Home from "../home/Home"
import ReviewPage from "../reviewforms/ReviewPage"
import Dashboard from "../components/AdminProductpage/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/reviewscreen",
                element: <ReviewPage />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },

        ]
    }
]);

export default router;
