import axios from "axios";
import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import ListPosts from "./ListPosts";

function Posts() {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const postsRes = await axios.get("http://localhost:5000/post/");
        setPosts(postsRes.data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <CreatePost getPosts={getPosts} />
            <ListPosts posts={posts} />
        </div>
    );
}

export default Posts;