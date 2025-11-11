import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { controllers } from "~/src/Controllers/Controllers";

export default function ProtectedRoute() {
    const isLogin = controllers()?.auth?.isLogin ?? false;
    const loc = useLocation();
    return isLogin ? <Outlet /> : <Navigate to="/login" replace state={{ from: loc }} />;
}