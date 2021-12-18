import { v4 } from "uuid";
import create from "zustand";
import { LOCAL_STORAGE_KEY } from "./constants";

export const useStore = create((set) => ({
    board: localStorage.getItem(LOCAL_STORAGE_KEY)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!)
        : {
              [v4()]: {
                  name: "Todo",
                  items: [],
              },
          },
    searchQuery: "",
    setSearchQuery: (query: string) => (set as any)({ searchQuery: query }),
    setBoard: (board: any) => {
        console.log("hey there, i'm in the setBoard");
        console.log(JSON.stringify(board));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
        (set as any)({ board });
    },
}));
