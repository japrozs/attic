import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BiX } from "react-icons/bi";
import { useStore } from "../../../store";
import { Card, Column } from "../../../types";

interface EditCardProps {
    open: boolean;
    setOpen: any;
    card: Card;
    tableId: string;
}

export const EditCard: React.FC<EditCardProps> = ({
    open,
    setOpen,
    card,
    tableId,
}) => {
    const [note, setNote] = useState(card.content);
    const { board, setBoard } = useStore((state) => state);

    const saveNote = () => {
        board[tableId].items.map((item: Card) => {
            if (item.id == card.id) {
                item.content = note;
                console.log("changing note value to ::", note);
            }
        });
        setBoard(board);
        setOpen(false);
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:mt-52 sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            style={{ backgroundColor: "#0D1117" }}
                            className="z-10 inline-block border border-gray-700 overflow-hidden text-left align-bottom transition-all transform  rounded shadow-xl sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                        >
                            <div
                                className="flex items-center px-4 py-3 border-b border-gray-800"
                                style={{
                                    backgroundColor: "#161B22",
                                }}
                            >
                                <p className="text-gray-200 text-sm font-medium">
                                    Edit Card
                                </p>
                                <BiX
                                    onClick={() => setOpen(false)}
                                    className="ml-auto mr-0 text-gray-400 cursor-pointer text-2xl hover:text-blue-500"
                                />
                            </div>
                            <div className="py-3 px-4">
                                <p className="text-gray-300 text-sm font-medium">
                                    Note
                                </p>
                                <textarea
                                    value={note}
                                    onChange={(e) => {
                                        setNote(e.target.value);
                                    }}
                                    className="mt-1.5 w-full rounded-md py-1.5 px-2 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring text-gray-200 text-sm"
                                    style={{
                                        backgroundColor: "#010409",
                                    }}
                                />
                                <button
                                    style={{
                                        width: "139px",
                                    }}
                                    onClick={saveNote}
                                    className={
                                        "bg-blue-600 mt-4 text-sm mr-1 rounded-md py-1.5 text-gray-100 font-medium hover:opacity-95 transition duration-75"
                                    }
                                >
                                    Save note
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
