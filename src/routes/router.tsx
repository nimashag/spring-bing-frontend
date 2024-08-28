import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "../App";
import Home from "../home/Home"
import ReviewPage from "../reviewforms/ReviewPage"

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
        ]
    }
]);

export default router;
