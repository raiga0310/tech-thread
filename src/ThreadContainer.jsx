import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <ul className="threads__list">
      {threads.map(thread => (
        <li key={thread.id} className="threads__element" onClick={() => navigate(`/threads/${thread.id}`)}>
          {thread.title}
        </li>
      ))}
    </ul>
  );
}

export function ThreadContainer() {
  return (
    <div className="threads">
      <h3>スレッド一覧</h3>
      <Suspense fallback={<Loading />}>
        <ThreadList />
      </Suspense>
    </div>
  );
}

function Loading() {
  return <h2>🌀 よみこみちう</h2>;
}