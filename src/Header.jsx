import { useNavigate } from "react-router-dom";

export function Header() {
    const navigete = useNavigate();
    return (
        <header className="header">
            <h2 
                className="app__name" 
                tabIndex={0}
                onClick={() => navigete('/')}
                onKeyDown={
                    (event) => {
                        if (event.key === 'Enter') {
                            navigete('/') 
                }}}
                aria-label="スレッド一覧に戻る"
            >掲示板アプリ</h2>
            <a className="new__thread" href="/threads/new">新規スレッド</a>
        </header>
    );
}