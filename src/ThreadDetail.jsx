import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "./Header";

function ThreadDetail() {
    return (
        <>
            <Header />
            <PostsList />
        </>
    )
}

function PostsList() {
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
        <h3>スレタイ</h3>
        <ul className="posts__list">
            {posts.map((post) => (
                <li key={post.id} className="posts__element">{post.post}</li>
            ))}
        </ul>
    </div>
  );
}

export default ThreadDetail;
