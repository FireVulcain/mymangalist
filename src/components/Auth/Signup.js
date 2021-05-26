import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) return setError("Passwords do not match");

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
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
                <h2>Sign Up</h2>
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
                    <div>
                        <label htmlFor="passwordConfirm">password confirmation</label>
                        <input type="password" name="passwordConfirm" ref={passwordConfirmRef} />
                    </div>
                    <button disabled={loading} type="submit">
                        Sign up
                    </button>
                </form>
            </div>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    );
};
