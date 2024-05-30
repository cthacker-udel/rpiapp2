"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type ImagePayload = {
    image: React.JSX.Element;
    link: string;
    title: string;
};

const IMAGES: ImagePayload[] = [
    {
        image: (
            <Image
                alt="CN Logo"
                height={200}
                key="logo1"
                quality={90}
                src="/cnlogo.png"
                width={200}
            />
        ),
        link: "https://www.ccm.udel.edu/",
        title: "Center for Composite Matierials",
    },
    {
        image: (
            <Image
                alt="Eco-P Logo"
                height={200}
                key="logo2"
                quality={90}
                src="/ecoplogo.png"
                width={200}
            />
        ),
        link: "https://www.ecoplasticproducts.org/",
        title: "Eco Plastic Products Org.",
    },
    {
        image: (
            <Image
                alt="Interlock Logo"
                height={200}
                key="logo3"
                quality={90}
                src="/interlocklogo.png"
                width={200}
            />
        ),
        link: "https://interlockpaving.com",
        title: "Interlock Pacing Inc.",
    },

    {
        image: (
            <Image
                alt="TMS Logo"
                height={200}
                key="logo4"
                quality={90}
                src="/tmslogo.png"
                width={200}
            />
        ),
        link: "https://www.tmsinternational.com/Services/SlagAggregates",
        title: "TMS International Inc.",
    },
    {
        image: (
            <Image
                alt="UD COE Logo"
                height={200}
                key="logo5s"
                quality={90}
                src="/udcoelogo.png"
                width={200}
            />
        ),
        link: "https://ce.udel.edu/",
        title: "UD College of Civil & Environmental Engineering",
    },
];

/**
 * The initial landing page the user sees when initially "landing" on this website
 *
 * @returns The landing page
 */
export const Landing = (): JSX.Element => (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 relative">
        <div className="animate-backInDown flex flex-col gap-8">
            <div className="text-xl lg:text-4xl text-center">
                {"Recycled Waste in Sustainable Concrete Pavers"}
            </div>
            <div className="flex flex-row justify-center w-full">
                <span className="!animate-delay-1000 animate-fadeIn w-2/3">
                    <Link href="project">
                        <button
                            className="btn btn-neutral hover:animate-rubberBand w-full"
                            type="button"
                        >
                            {"Go To Project!"}
                        </button>
                    </Link>
                </span>
            </div>
        </div>
        <div
            className="flex flex-col lg:flex-row items-center gap-4 p-3 max-h-full rounded-btn mt-28 absolute top-2/4 lg:max-h-32 animate-fadeIn animate-delay-2s"
            id="sponsor_container"
        >
            {...IMAGES.map((eachImage, index) => (
                <a
                    className="animate-flipInX"
                    href={eachImage.link}
                    key={`logo_${eachImage.image.props.alt}`}
                    ref={(link) => {
                        if (link) {
                            link.style.setProperty(
                                "animation-delay",
                                `${(index + 5) / 2}s`,
                                "important",
                            );
                        }
                    }}
                    rel="noreferrer"
                    target="_blank"
                >
                    {eachImage.image}
                </a>
            ))}
        </div>
    </div>
);
