import { useNavigate } from "react-router-dom";

export function Header() {
    const navigete = useNavigate();
    return (
        <header className="header">
            <h2 className="app__name" onClick={() => navigete('/')}>掲示板アプリ</h2>
            <a className="new__thread" href="/threads/new">新規スレッド</a>
        </header>
    );
}