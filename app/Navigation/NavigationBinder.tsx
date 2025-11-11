import { useEffect } from "react";
import { useNavigate } from "react-router";
import {appNavigator} from "~/src/Controllers/Navigation";

export default function NavigationBinder() {
    const navigate = useNavigate();
    useEffect(() => {
        appNavigator().setNavigate(navigate);
    }, [navigate]);
    return null;
}