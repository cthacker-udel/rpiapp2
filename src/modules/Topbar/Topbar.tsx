import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 *
 * @returns
 */
export const Topbar = (): JSX.Element => (
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
                {"Home"}
            </Link>
            <Link className="btn ml-3 btn-sm" href="/project">
                {"Project"}
            </Link>
            <Link className="btn ml-3 btn-sm" href="project/details">
                {"Details"}
            </Link>
            <Link className="btn ml-3 btn-sm" href="project/credits">
                {"Credits"}
            </Link>
        </div>
    </div>
);
