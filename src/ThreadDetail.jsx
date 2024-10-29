import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Header } from "./Header";

function ThreadDetail() {
    const location = useLocation();
    const threadTitle = location.state?.threadTitle;
    return (
        <>
            <Header />
            <PostsList title={threadTitle}/>
        </>
    )
}

import PropTypes from 'prop-types';

function PostsList({ title }) {
    const { threadId } = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
            {
                method: 'GET'
            }
        ).then(response => response.json())
        .then(data => {
            setPosts(data.posts);
        })
    }, [threadId]);
  return (
    <div className="posts">
        <h3>{title}</h3>
        <ul className="posts__list">
            {posts.map((post) => (
                <li key={post.id} className="posts__element">{post.post}</li>
            ))}
        </ul>
    </div>
  );
}

PostsList.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ThreadDetail;
