import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { Header } from "./Header";

function ThreadDetail() {
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
        <>
            <Header />
            <PostsList posts={posts} />
        </>
    )
}

function PostsList({ posts }) {
  return (
    <div className="posts">
        <h3>スレタイ</h3>
        <ul className="posts__list">
            {posts.map((post) => (
                <li key={post.id} className="posts__element">{post.post}</li>
            ))}
        </ul>
    </div>
  );
}

PostsList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            post: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ThreadDetail;
