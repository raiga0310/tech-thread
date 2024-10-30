import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let threadsData = null;

async function fetchThreadData() {
  const response = await fetch("https://railway.bulletinboard.techtrain.dev/threads", { method: "GET" });
  return response.json();
}

function ThreadList() {
  if(!threadsData) {
    throw fetchThreadData().then((data) => { threadsData = data});
  }
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
      {threadsData.map(thread => (
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

export default ThreadList;
