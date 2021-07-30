import React from "react";

function ListPosts({ posts }) {
    function renderPosts() {
        if (posts.length > 0) {
            return posts.map((post, i) => {
                return (
                    <li key={i}>
                        <span>Title : {post.name}</span><br />
                        <span>Description: {post.content}</span>
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
                {renderPosts()}
            </ul>
        </div>
    );
}

export default ListPosts;