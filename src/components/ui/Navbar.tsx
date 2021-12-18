import React from "react";
import { BiSearch } from "react-icons/bi";
import { useStore } from "../../store";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const { searchQuery, setSearchQuery } = useStore((state) => state);
    return (
        <div className="flex items-center pl-1 pt-1 mb-7">
            <h1 className="text-gray-200 font-medium text-3xl">
                🏠 Your attic
            </h1>
            <div
                className="self-center flex items-center ml-auto mr-5 max-w-md w-full rounded-md py-1.5 px-2 border border-gray-700 focus-within:outline-none focus-within:border-blue-500 focus-within:ring text-gray-200 text-sm"
                style={{
                    backgroundColor: "#010409",
                }}
            >
                <BiSearch className="text-gray-500 text-xl" />
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter cards"
                    className="bg-transparent w-full focus:outline-none ml-1.5"
                />
            </div>
            <a target={"_blank"} href={"https://www.japrozsaini.me"}>
                <svg
                    className="ml-auto mr-0 w-8 h-auto cursor-pointer"
                    width="177"
                    height="177"
                    viewBox="0 0 177 177"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_1_2)">
                        <rect width="177" height="177" rx="32" fill="#FD4D4D" />
                        <g filter="url(#filter0_d_1_2)">
                            <rect
                                x="184.246"
                                y="20"
                                width="37"
                                height="233"
                                transform="rotate(63.3495 184.246 20)"
                                fill="#FAF7F7"
                            />
                        </g>
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_1_2"
                            x="-43"
                            y="5"
                            width="262.842"
                            height="175.581"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="9.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_1_2"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_1_2"
                                result="shape"
                            />
                        </filter>
                        <clipPath id="clip0_1_2">
                            <rect
                                width="177"
                                height="177"
                                rx="32"
                                fill="white"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </a>
        </div>
    );
};
