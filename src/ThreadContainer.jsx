import { Suspense } from "react";
import ThreadList from "./components/ThreadList";
import Loading from "./components/Loaing";

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
