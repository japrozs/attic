import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LOCAL_STORAGE_KEY } from "../../../constants";
import { useStore } from "../../../store";
import { Card, Column } from "../../../types";

interface CardMenuProps {
    setOpen: any;
    item: Card;
    tableId: string;
    index: number;
}

export const CardMenu: React.FC<CardMenuProps> = ({
    setOpen,
    item: card,
    tableId,
    index,
}) => {
    const { board, setBoard } = useStore((state) => state);

    const deleteNote = () => {
        console.log("--- delete note output ---");
        board[tableId].items.splice(index, 1);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
        setBoard(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"));
        console.log("--- END delete note output ---");
    };

    return (
        <div className="pt-0.5">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="focus:outline-none">
                        <BiDotsHorizontalRounded className=" ml-2 text-lg cursor-pointer text-icon-gray hover:text-blue-500" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="z-10 absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg border border-gray-700 focus:outline-none"
                        style={{ backgroundColor: "#161B22" }}
                    >
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        style={{
                                            backgroundColor: active
                                                ? "#1F6FEB"
                                                : undefined,
                                        }}
                                        onClick={() => setOpen(true)}
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-300"
                                        } group flex items-center w-full px-2 py-1.5 text-sm`}
                                    >
                                        Edit note
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        style={{
                                            backgroundColor: active
                                                ? "#1F6FEB"
                                                : undefined,
                                        }}
                                        onClick={deleteNote}
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-300"
                                        } group flex items-center w-full px-2 py-1.5 text-sm`}
                                    >
                                        Delete note
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
