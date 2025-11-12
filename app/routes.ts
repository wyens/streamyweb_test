import { route, index } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    route("", "routes/ProtectedRoute.tsx", [
        route("home", "routes/home.tsx"),
        route("video", "routes/video.tsx")
    ]),
];