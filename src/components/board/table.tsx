import React, { useState, Fragment, useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { v4 } from "uuid";
import { Card } from "./card";
import { BoardMenu } from "./menu/BoardMenu";
import { EditColumn } from "./modals/EditColumn";
import { Column } from "../../types";

interface TableProps {
    columnId: string;
    column: Column;
    setBoard: React.Dispatch<any>;
    board: any;
}

export const Table: React.FC<TableProps> = ({
    column,
    columnId,
    setBoard,
    board,
}) => {
    const [creatingNewNote, setCreatingNewNote] = useState(false);
    const [note, setNote] = useState("");
    const [open, setOpen] = useState(false);
    console.log(column);
    console.log("columnId ::", columnId);

    useEffect(() => {
        console.log(`something changed with column ${column.name}`);
        console.log(column);
        setBoard(board);
    }, [column.items]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
            key={columnId}
        >
            <div className="mx-1.5">
                <div
                    className="flex items-center  p-2  rounded-tr-sm rounded-tl-sm px-3 border-t border-l border-r border-gray-800"
                    style={{
                        backgroundColor: "#010409",
                    }}
                >
                    <p className="text-gray-200 text-xs bg-gray-700  rounded-sm p-0.5 px-1 mr-3">
                        {column.items.length}
                    </p>
                    <p
                        className="font-medium text-sm"
                        style={{
                            color: "#C9D1D9",
                        }}
                    >
                        {column.name}
                    </p>
                    <div className="flex items-center ml-auto mr-1">
                        <BiPlus
                            onClick={() => setCreatingNewNote(true)}
                            className="text-xl cursor-pointer text-icon-gray hover:text-blue-500"
                        />
                        <BoardMenu
                            column={column}
                            columnId={columnId}
                            setBoard={setBoard}
                            setOpen={setOpen}
                        />
                    </div>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="p-2 rounded-bl-sm rounded-br-sm px-3 border-l border-r border-b border-gray-800"
                                style={{
                                    width: "310px",
                                    minHeight: 500,
                                    backgroundColor: "#010409",
                                }}
                            >
                                <>
                                    {creatingNewNote && (
                                        <div className="mb-3">
                                            <textarea
                                                value={note}
                                                onChange={(e) =>
                                                    setNote(e.target.value)
                                                }
                                                placeholder="Enter a task"
                                                className="w-full p-2 border border-gray-700 rounded-md focus:border-blue-500 focus:ring focus:outline-none text-sm text-white h-max"
                                                style={{
                                                    backgroundColor: "#0D1117",
                                                }}
                                            />
                                            <div className="flex items-center">
                                                <button
                                                    disabled={
                                                        note.trim().length == 0
                                                    }
                                                    onClick={() => {
                                                        column.items = [
                                                            {
                                                                id: v4(),
                                                                content: note,
                                                            },
                                                            ...column.items,
                                                        ];
                                                        setNote("");
                                                        setCreatingNewNote(
                                                            false
                                                        );
                                                    }}
                                                    className={
                                                        note.trim().length == 0
                                                            ? "bg-blue-600 w-full text-sm mr-1 rounded-sm py-1 text-gray-100 font-medium opacity-70 cursor-not-allowed"
                                                            : "bg-blue-600 w-full text-sm mr-1 rounded-sm py-1 text-gray-100 font-medium hover:opacity-95 transition duration-75"
                                                    }
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setCreatingNewNote(
                                                            false
                                                        )
                                                    }
                                                    className="bg-gray-800 border border-gray-600 w-full text-sm ml-1 rounded-sm py-1 text-gray-100 font-medium hover:bg-gray-700 transition duration-75"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {column.items.map((item, index) => {
                                        return (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <Card
                                                            provided={provided}
                                                            snapshot={snapshot}
                                                            tableId={columnId}
                                                            item={item}
                                                            index={index}
                                                        />
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                </>
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            <EditColumn
                setOpen={setOpen}
                open={open}
                id={columnId}
                column={column}
            />
        </div>
    );
};
