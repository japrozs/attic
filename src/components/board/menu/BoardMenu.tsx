import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LOCAL_STORAGE_KEY } from "../../../constants";
import { Column } from "../../../types";

interface BoardMenuProps {
    columnId: string;
    column: Column;
    setBoard: React.Dispatch<any>;
    setOpen: any;
}

export const BoardMenu: React.FC<BoardMenuProps> = ({
    column,
    columnId,
    setBoard,
    setOpen,
}) => {
    return (
        <div className="pt-1.5">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button>
                        <BiDotsHorizontalRounded className=" ml-2 text-xl cursor-pointer text-icon-gray hover:text-blue-500" />
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
                        className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg border border-gray-700 focus:outline-none"
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
                                        Edit column
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
                                        onClick={() => {
                                            const board = JSON.parse(
                                                localStorage.getItem(
                                                    LOCAL_STORAGE_KEY
                                                )!
                                            );
                                            delete board[columnId];
                                            console.log(
                                                "board with table deleted ::",
                                                board
                                            );
                                            localStorage.setItem(
                                                LOCAL_STORAGE_KEY,
                                                JSON.stringify(board)
                                            );
                                            setBoard(board);
                                        }}
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-300"
                                        } group flex items-center w-full px-2 py-1.5 text-sm`}
                                    >
                                        Delete column
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
