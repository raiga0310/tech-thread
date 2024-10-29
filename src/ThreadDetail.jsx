import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Header } from "./Header";

function ThreadDetail() {
    const location = useLocation();
    const threadTitle = location.state?.threadTitle;
    return (
        <>
            <Header />
            <div className="posts__container">   
                <PostsList title={threadTitle}/>
                <NewPostForm />
            </div>
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

function NewPostForm() {
    const [post, setPost] = useState('');
    const { threadId } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://railway.bulletinboard.techtrain.dev/threads/'+ threadId + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post })
        });

        setPost('');
    }

    return (
        <div className="form__thread">
            <h3>投稿する</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="post" id="name" onChange={(e) => setPost(e.target.value)} placeholder="投稿" />
                <input type="submit" value="送信" />
            </form>
        </div>
    )
}

export default ThreadDetail;
