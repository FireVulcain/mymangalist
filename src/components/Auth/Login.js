import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push("/");
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <>
            <div>
                <h2>Log In</h2>
                {error && error}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" ref={emailRef} />
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" ref={passwordRef} />
                    </div>
                    <button disabled={loading} type="submit">
                        Log In
                    </button>
                </form>
            </div>
            <div>
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    );
};
