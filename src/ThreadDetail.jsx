import { useEffect, useState } from "react";
import { ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { Header } from "./Header";

function ThreadDetail() {
    const [posts, setPosts] = useState([]);
    const { threadId } = useParams();
    const location = useLocation();
    const threadTitle = location.state?.threadTitle;

    const fetchPosts = async (threadId) => {
        
        const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
            {
                method: 'GET'
            }
        )
        const json = await response.json();
        setPosts(json.posts);
    }
    useEffect(()=>{
        fetchPosts(threadId);
    }, [threadId]);
    return (
        <>
            <Header />
            <main className="posts__container">   
                <PostsList title={threadTitle} posts={posts}/>
                <NewPostForm fetchPosts={fetchPosts} aria-live="assertive"/>
            </main>
            <ScrollRestoration />
        </>
    )
}

import PropTypes from 'prop-types';

function PostsList({ title, posts }) {
  return (
    <article className="posts">
        <h3>{title}</h3>
        <ul className="posts__list">
            {posts.map((post) => (
                <li key={post.id} className="posts__element">{post.post}</li>
            ))}
        </ul>
    </article>
  );
}

PostsList.propTypes = {
    title: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired
};

function NewPostForm({ fetchPosts }) {
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
        fetchPosts(threadId);
    }

    return (
        <aside className="form__thread">
            <h3>投稿する</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="post" 
                    id="name" 
                    onChange={(e) => setPost(e.target.value)} 
                    placeholder="投稿" 
                    aria-label="投稿したい内容を入力"
                />
                <input type="submit" value="送信" />
            </form>
        </aside>
    )
}

NewPostForm.propTypes = {
    fetchPosts: PropTypes.func.isRequired
}

export default ThreadDetail;
