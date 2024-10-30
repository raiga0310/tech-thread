import { useEffect, useState } from "react";
import { ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { Header } from "./Header";
import PostList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";

function ThreadDetail() {
    const [posts, setPosts] = useState([]);
    const { threadId } = useParams();
    const location = useLocation();
    const threadTitle = location.state?.threadTitle;

    async function fetchPosts (threadId) {
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
                <PostList title={threadTitle} posts={posts}/>
                <NewPostForm fetchPosts={fetchPosts} aria-live="assertive"/>
            </main>
            <ScrollRestoration />
        </>
    )
}


export default ThreadDetail;
