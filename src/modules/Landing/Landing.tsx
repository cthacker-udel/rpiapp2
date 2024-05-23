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
export const Landing = (): JSX.Element => {
    const [showSponsors, setShowSponsors] = React.useState<boolean>(false);

    React.useEffect(() => {
        setTimeout(() => {
            setShowSponsors(true);
        }, 2000);
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 relative">
            <div className="animate-backInDown flex flex-col gap-8">
                <div className="text-4xl">
                    {"Welcome to the Raspberry Pi Paver Project!"}
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
            {showSponsors && (
                <div
                    className="flex flex-row items-center gap-4 bg-blue-gray-400 bg-opacity-30 p-3 rounded-btn mt-28 absolute top-2/4 max-h-32"
                    id="sponsor_container"
                >
                    {...IMAGES.map((eachImage, index) => (
                        <a
                            className={`animate-flipInX !animate-delay-${index * (25 * 3)}`}
                            href={eachImage.link}
                            key={`logo_${eachImage.image.props.alt}`}
                            ref={(link) => {
                                if (link) {
                                    link.style.setProperty(
                                        "animation-delay",
                                        `${index / 2}s`,
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
            )}
        </div>
    );
};
