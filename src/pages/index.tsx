import Head from "next/head";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Board } from "../components/board/board";
import { BiQuestionMark } from "react-icons/bi";
import { Navbar } from "../components/ui/Navbar";
import { HelpModal } from "../components/board/modals/HelpModal";

export default function Home() {
    const [winReady, setWinReady] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setWinReady(true);
    });
    return (
        <div className="p-3">
            <Head>
                <title>Your Attic</title>
            </Head>
            {winReady ? (
                <>
                    <Navbar />
                    <Board />
                    <HelpModal open={open} setOpen={setOpen} />
                    <div
                        onClick={() => setOpen(true)}
                        className="flex items-center justify-center bg-black w-10 h-10 rounded-full z-10 absolute bottom-2 right-2 border border-gray-900 cursor-pointer group"
                    >
                        <BiQuestionMark className="text-gray-200 text-xl group-hover:text-blue-500" />
                    </div>
                </>
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
}
