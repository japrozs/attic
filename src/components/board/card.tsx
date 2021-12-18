import React, { useEffect, useState, createRef } from "react";
import {
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProvided,
    DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { BiDotsHorizontalRounded, BiDetail } from "react-icons/bi";
import { useStore } from "../../store";
import { CardMenu } from "./menu/CardMenu";
import { EditCard } from "./modals/EditCard";
import { EditColumn } from "./modals/EditColumn";

interface Card {
    id: string;
    content: string;
}

interface CardProps {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    item: Card;
    tableId: string;
    index: number;
}

export const Card: React.FC<CardProps> = ({
    provided,
    snapshot,
    item,
    tableId,
    index,
}) => {
    const { searchQuery } = useStore((state) => state);
    const [open, setOpen] = useState(false);

    const formatText = (str: string) => {
        str = str?.replace(/(www|http:|https:)+[^\s]+[\w]/g, (t) => {
            console.log("link ::", t);

            return `<a href="${t}" class="text-blue-500 hover:underline"  target="_blank">${t}</a>`;
        });

        // match tildes - (code)
        console.log(str);
        str = str?.replace(/`(.*?)`/g, (t) => {
            console.log("code in tilde ::", t);
            return `<code>${t.substring(1, t.length - 1)}</code>`;
        });
        return str;
    };

    const card = (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`flex align-top move p-2 mb-2 text-gray-200 rounded-sm ${
                snapshot.isDragging ? "ring" : ""
            }`}
            style={{
                backgroundColor: "#161B22",
                border: "1px solid #262C33",
                ...provided.draggableProps.style,
            }}
        >
            <BiDetail className="mr-1.5 text-xl text-icon-gray" />
            <p
                className="w-full text-sm"
                style={{ color: "#C1C9D1" }}
                dangerouslySetInnerHTML={{
                    __html: formatText(item.content),
                }}
            ></p>
            <CardMenu
                setOpen={setOpen}
                tableId={tableId}
                item={item}
                index={index}
            />

            <EditCard
                setOpen={setOpen}
                open={open}
                card={item}
                tableId={tableId}
            />
        </div>
    );

    if (searchQuery.trim().length == 0) {
        return card;
    } else {
        if (
            item.content
                .trim()
                .split(" ")
                .join("")
                .toLowerCase()
                .includes(searchQuery.trim().split(" ").join("").toLowerCase())
        ) {
            return card;
        } else {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="hidden"
                ></div>
            );
        }
    }
};
