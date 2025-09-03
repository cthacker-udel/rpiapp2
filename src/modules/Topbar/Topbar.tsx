/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- disabled*/
"use client";
import { Drawer } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaRaspberryPi } from "react-icons/fa";
import { IoIosConstruct } from "react-icons/io";
import { IoHome } from "react-icons/io5";

import { PiIds } from "./PiIds/PiIds";

const BUTTON_DISABLED_STYLE = "btn-neutral btn-disabled";

/**
 * The Topbar of the application, houses the navigation
 *
 * @returns The icon of UD, and the buttons used for navigating throughout the project
 */
export const Topbar = (): React.JSX.Element => {
    /** Grabs pathname (used for "currently selected") */
    const pathName = usePathname();

    /** Whether to show the drawer */
    const [showPiDrawer, setShowPiDrawer] = React.useState<boolean>(false);

    /** Toggles the visibility of the drawer */
    const toggleDrawer = React.useCallback((): void => {
        setShowPiDrawer((oldValue) => !oldValue);
    }, []);

    /**
     * Fires when the pathname changes, resets the drawer to hide (when the user is changing pages, etc)s
     */
    React.useEffect(() => {
        if (pathName.length > 0 && pathName !== "/project") {
            setShowPiDrawer(false);
        }
    }, [pathName]);

    return (
        <div className="bg-base-100 navbar">
            <div className="avatar">
                <div
                    className="hover:bg-gray-300 p-1 pl-2 border border-black border-opacity-50 rounded-full w-14 transition-all"
                    title="University of Delaware"
                >
                    <a
                        href="https://www.udel.edu/"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image
                            alt="University of Delaware Logo"
                            className="w-full"
                            height={300}
                            src="/udlogo.png"
                            width={300}
                        />
                    </a>
                </div>
            </div>
            <div className="hidden lg:flex navbar-start">
                <Link className="ml-3 btn btn-sm" href="/" title="Home Page">
                    <IoHome />
                    {"Home"}
                </Link>
                <Link
                    className={`btn ml-3 btn-sm ${pathName === "/project" ? BUTTON_DISABLED_STYLE : ""}`}
                    href="/project"
                    title="Project Page"
                >
                    <IoIosConstruct />
                    {"Project"}
                </Link>
                <Link
                    className={`btn ml-3 btn-sm ${pathName === "/project/details" ? BUTTON_DISABLED_STYLE : ""}`}
                    href="project/details"
                    title="Details Page"
                >
                    <CgDetailsMore />
                    {"Details"}
                </Link>
                <button
                    className={`btn ml-3 btn-sm btn-info text-white ${showPiDrawer ? "" : "btn-outline hover:!text-white"} ${pathName === "/project" ? "animate-bounceIn" : "animate-bounceOut"}`}
                    disabled={pathName !== "/project"}
                    onClick={toggleDrawer}
                    title="Select Paver Dropdown Toggle"
                    type="button"
                >
                    <FaRaspberryPi />
                    {"Select Pi"}
                </button>
            </div>
            <div className="dropdown">
                <div
                    className="lg:hidden ml-3 btn btn-ghost"
                    role="button"
                    tabIndex={0}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6h16M4 12h8m-8 6h16"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
                <ul
                    className="z-[3] gap-2 bg-base-100 shadow mt-3 p-2 rounded-box w-fit menu menu-sm dropdown-content"
                    tabIndex={0}
                >
                    <li>
                        <Link className="!m-0 ml-3 w-fit btn btn-sm" href="/">
                            <IoHome />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`btn ml-3 btn-sm !m-0 ${pathName === "/project" ? BUTTON_DISABLED_STYLE : ""} w-fit`}
                            href="/project"
                        >
                            <IoIosConstruct />
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`btn ml-3 btn-sm !m-0 ${pathName === "/project/details" ? BUTTON_DISABLED_STYLE : ""} w-fit`}
                            href="project/details"
                        >
                            <CgDetailsMore />
                        </Link>
                    </li>
                    <li>
                        {" "}
                        <button
                            className={`btn ml-3 btn-sm !m-0 btn-info text-white ${showPiDrawer ? "" : "btn-outline hover:!text-white"} ${pathName === "/project" ? "animate-bounceIn" : "animate-bounceOut"} w-fit`}
                            disabled={pathName !== "/project"}
                            onClick={toggleDrawer}
                            type="button"
                        >
                            <FaRaspberryPi />
                        </button>
                    </li>
                </ul>
            </div>{" "}
            {/* @ts-expect-error -- ignore error for this */}
            <Drawer
                className="flex-col justify-start p-4 w-2/3 lg:w-full"
                open={showPiDrawer}
                overlay={false}
                placement="right"
            >
                <div className="flex flex-col w-full">
                    <div className="text-smBase lg:text-lg text-center">
                        {"Available Pavers"}
                    </div>
                    <div className="divider" />
                    <div>
                        <PiIds />
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
