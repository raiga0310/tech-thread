import { useState } from "react";

function ThreadForm() {
    const [title, setTitle] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        setTitle('');
    }
    return (
        <main className="form__thread">
            <h3>新規スレッド</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    placeholder="スレタイ"
                    aria-label="話したい話題のタイトルを入力"
                />
                <input type="submit" value="作成" />
            </form>
            <a href="/">スレ一覧へ</a>
        </main>
    )
}

export default ThreadForm;
