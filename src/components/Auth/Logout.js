import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const history = useHistory();

    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            {error && error}
            {currentUser && <button onClick={handleLogout}>Log Out</button>}
        </div>
    );
};
