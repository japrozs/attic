import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import { v4 } from "uuid";
import { LOCAL_STORAGE_KEY } from "../../constants";
import { useStore } from "../../store";
import { Table } from "./table";

interface BoardProps {}

export const Board: React.FC<BoardProps> = ({}) => {
    const board = useStore((state) => state.board);
    const setBoard = useStore((state) => state.setBoard);
    console.log("zusboard ::", board);

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    return (
        <>
            {board && (
                <div className="flex h-full mt-3 overflow-x-scroll no-scrollbar">
                    <DragDropContext
                        onDragEnd={(result) =>
                            onDragEnd(result, board, setBoard)
                        }
                    >
                        {Object.entries(board).map(
                            ([columnId, column], index) => (
                                <Table
                                    key={columnId}
                                    columnId={columnId}
                                    column={column as any}
                                    setBoard={setBoard}
                                    board={board}
                                />
                            )
                        )}
                    </DragDropContext>
                    <div
                        onClick={() => {
                            setBoard({
                                ...board,
                                [v4()]: {
                                    name: "New Column",
                                    items: [],
                                },
                            });
                        }}
                        className="flex cursor-pointer justify-center items-center border border-gray-600 h-24 hover:border-blue-600 rounded-md group"
                    >
                        <p className="flex items-center mx-24 text-gray-400 font-medium group-hover:text-blue-500">
                            <BiPlus className="text-xl cursor-pointer text-icon-gray group-hover:text-blue-500" />
                            New
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
