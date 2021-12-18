export interface Column {
    name: string;
    items: {
        id: string;
        content: string;
    }[];
}

export interface Card {
    id: string;
    content: string;
}
