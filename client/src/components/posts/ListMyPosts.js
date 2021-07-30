import axios from "axios";
import React, { useState } from "react";

function ListMyPosts({ posts, getPosts }) {

    const [editPost, seteditPost] = useState("False");
    const [postName, setPostName] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postID, setPostID] = useState("");

    async function edit(postId, name, content) {
        seteditPost(true);
        setPostName(name);
        setPostContent(content);
        setPostID(postId);
    }

    function cancelEdit(){
        seteditPost(false);
    }

    async function savePost(e) {
        e.preventDefault();

        try {
            const postData = {
                name: postName,
                content: postContent
            }
            await axios.put(`http://localhost:5000/post/${postID}`, postData);
            seteditPost(false);
            getPosts();
            
        } catch (error) {
            console.error(error);
        }
    }

    function editPosts() {
        var styles = {
            border: "1px solid black"
        };
        return (
            <div style={styles}>
                <h3>Edit Post</h3>
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
                <button type="submit">Edit</button>
                <button onClick={cancelEdit}>Cancel</button>
            </form>
            </div>
        );
    }

    async function deletePost(postId) {
        await axios.delete(`http://localhost:5000/post/${postId}`);
        getPosts();
    }

    function renderPosts() {
        if (posts.length > 0) {
            return posts.map((post, i) => {
                const postId = post._id;
                return (
                    <li key={i}>
                        <span>Title : {post.name}</span><br />
                        <span>Description: {post.content}</span>
                        <input type="button" value="Edit" onClick={() => edit(postId, post.name, post.content)}
                        />


                        <input type="button" value="Delete" onClick={() => deletePost(postId)}
                        />
                    </li>
                );
            })
        }
        else {
            return (
                <div>
                    <span>No Data Available</span>
                </div>
            );
        }
    }

    return (
        <div>
            <ul>
                {editPost === true && editPosts()}
                {renderPosts()}
            </ul>
        </div>
    );
}

export default ListMyPosts;