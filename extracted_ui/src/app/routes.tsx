import { createBrowserRouter } from "react-router";
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/feed",
    Component: FeedPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/notifications",
    Component: NotificationsPage,
  },
]);