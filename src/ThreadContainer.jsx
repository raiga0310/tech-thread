import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ThreadContainer() {
  return (
    <main className="threads">
      <h3>スレッド一覧</h3>
      <Suspense fallback={<Loading />}>
        <ThreadList />
      </Suspense>
    </main>
  );
}

// データフェッチのためのプロミスを保持
let threadData = null;
let promise = null;

function fetchThreadData() {
  if (threadData) return threadData;
  if (!promise) {
    promise = fetch('https://railway.bulletinboard.techtrain.dev/threads')
      .then(response => response.json())
      .then(data => {
        threadData = data;
        return threadData;
      });
  }
  throw promise;
}

function ThreadList() {
  const threads = fetchThreadData();
  const navigate = useNavigate();  
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [selectedThreadTitle, setSelectedThreadTitle] = useState(null);
  
  useEffect(() => {
    if (selectedThreadId !== null) {
      navigate(`/threads/${selectedThreadId}`, {
        state: { threadTitle: selectedThreadTitle }
      });
      // ナビゲーション後はステートをリセット
      setSelectedThreadId(null);
      setSelectedThreadTitle(null);
    }
  }, [selectedThreadId, selectedThreadTitle, navigate]);

  const handleThreadClick = (thread) => {
    setSelectedThreadId(thread.id);
    setSelectedThreadTitle(thread.title);
  };

  return (
    <ul className="threads__list">
      {threads.map(thread => (
        <li 
          key={thread.id} 
          className="threads__element" 
          onClick={() => handleThreadClick(thread)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleThreadClick(thread)
            }
          }}
          tabIndex={0}
        >
          {thread.title}
        </li>
      ))}
    </ul>
  );
}

function Loading() {
  return <h2>🌀 よみこみちう</h2>;
}