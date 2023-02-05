import { Outlet, Route, Routes } from "react-router-dom";
import { UserForm } from "../users/user-form/UserForm";
import { User } from "../users/user/User";

export function Main() {
    return (
        <div className="main-content">
            <Outlet />
        </div>
    )
}