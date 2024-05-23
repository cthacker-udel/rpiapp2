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

/**
 *
 * @returns
 */
export const Topbar = (): JSX.Element => {
    const pathName = usePathname();

    const [showPiDrawer, setShowPiDrawer] = React.useState<boolean>(false);

    const toggleDrawer = React.useCallback((): void => {
        setShowPiDrawer((oldValue) => !oldValue);
    }, []);

    React.useEffect(() => {
        if (
            pathName !== undefined &&
            pathName.length > 0 &&
            pathName !== "/project"
        ) {
            setShowPiDrawer(false);
        }
    }, [pathName]);

    return (
        <div className="navbar bg-base-100">
            <div className="avatar">
                <div
                    className="w-14 rounded-full border border-black border-opacity-50 p-1 pl-2 hover:bg-gray-300 transition-all"
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
                <Link className="btn ml-3 btn-sm" href="/">
                    <IoHome />
                    {"Home"}
                </Link>
                <Link
                    className={`btn ml-3 btn-sm ${pathName === "/project" ? "btn-neutral btn-disabled" : ""}`}
                    href="/project"
                >
                    <IoIosConstruct />
                    {"Project"}
                </Link>
                <Link
                    className={`btn ml-3 btn-sm ${pathName === "/project/details" ? "btn-neutral btn-disabled" : ""}`}
                    href="project/details"
                >
                    <CgDetailsMore />
                    {"Details"}
                </Link>
                <button
                    className={`btn ml-3 btn-sm btn-info text-white ${showPiDrawer ? "" : "btn-outline hover:!text-white"} ${pathName === "/project" ? "animate-bounceIn" : "animate-bounceOut"}`}
                    disabled={pathName !== "/project"}
                    onClick={toggleDrawer}
                    type="button"
                >
                    <FaRaspberryPi />
                    {"Select Pi"}
                </button>
                {/* @ts-expect-error -- ignore error for this */}
                <Drawer
                    className="p-4"
                    open={showPiDrawer}
                    overlay={false}
                    placement="right"
                >
                    <div className="text-lg text-center">
                        {"Available Pavers"}
                    </div>
                    <div className="divider" />
                    <div>
                        <PiIds />
                    </div>
                </Drawer>
            </div>
        </div>
    );
};
