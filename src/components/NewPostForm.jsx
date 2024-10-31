import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

function NewPostForm({ fetchPosts }) {
    const [post, setPost] = useState('');
    const { threadId } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`, {
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
                    required
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

export default NewPostForm;
