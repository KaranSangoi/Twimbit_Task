import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutBtn from "../auth/LogOutBtn";

function Navbar() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <div>
            <Link to="/">Home</Link>
            {loggedIn === false && (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Log in</Link>
                </>
            )}
            {loggedIn === true && (
                <>
                    <Link to="/posts">All Posts</Link>
                    <Link to="/myPosts">My Posts</Link>
                    <LogOutBtn />
                </>
            )}

        </div>
    );
};

export default Navbar;

