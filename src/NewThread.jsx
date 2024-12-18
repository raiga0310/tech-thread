import { ScrollRestoration } from "react-router-dom";
import { Header } from "./Header";
import ThreadForm from "./components/ThreadForm";

function NewThread() {
    return (
        <>
            <Header />
            <ThreadForm />
            <ScrollRestoration />
        </>
    )
}

export default NewThread;
