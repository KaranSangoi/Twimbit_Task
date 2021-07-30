import axios from "axios";
import React, { useState } from "react";

function CreatePost({getPosts}) {
    const [postName, setPostName] = useState("");
    const [postContent, setPostContent] = useState("");

    var styles = {
        border: "1px solid black"
    };

    async function savePost(e) {
        e.preventDefault();

        try {
            const postData = {
                name: postName,
                content: postContent
            }
            await axios.post("http://localhost:5000/post/", postData);
            getPosts();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={styles}>
            <h2>Create Post</h2>
            <form onSubmit={savePost}>
                <input
                    type="text"
                    placeholder="Enter Title"
                    onChange={(e) => {
                        setPostName(e.target.value);
                    }}
                    value={postName}
                />
                <input
                    type="textarea"
                    placeholder="Description"
                    onChange={(e) => {
                        setPostContent(e.target.value);
                    }}
                    value={postContent}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePost;