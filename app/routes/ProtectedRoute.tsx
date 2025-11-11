// ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { controllers } from "~/src/Controllers/Controllers";

export default function ProtectedRoute() {
    const isLogin = controllers()?.auth?.isLogin ?? false;
    const loc = useLocation();

    if (!isLogin) {
        return <Navigate to="/login" replace state={{ from: loc }} />;
    }
    return <Outlet />;
}