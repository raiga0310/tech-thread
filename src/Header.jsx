export function Header() {
    return (
        <header className="header">
            <h2 className="app__name">掲示板アプリ</h2>
            <a className="new__thread" href="/threads/new">新規スレッド</a>
        </header>
    );
}