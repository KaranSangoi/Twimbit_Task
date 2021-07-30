import axios from "axios";
import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import ListMyPosts from "./ListMyPosts";

function MyPosts() {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const postsRes = await axios.get("http://localhost:5000/post/mypost/");
        setPosts(postsRes.data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <CreatePost getPosts={getPosts} />
            <ListMyPosts posts={posts} getPosts={getPosts} />
        </div>
    );
}

export default MyPosts;