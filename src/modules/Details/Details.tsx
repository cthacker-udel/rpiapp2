/* eslint-disable quotes -- disabled */
import React from "react";

/**
 * The details of the project
 *
 * @returns The page for the details of the project
 */
export const Details = (): JSX.Element => (
    <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-2/3 h-2/3 hidden lg:flex">
            <div className="animate-fadeInLeft">
                <article className="prose">
                    <h1>{"Project Background and Acknowledgements"}</h1>
                    <p>
                        {
                            'There are more than 1000 lbs of plastics and recycled waste products in these pavers that would otherwise have been placed in landfills! This project was selected and partially funded by the University of Delaware Office of Sustainability (formerly Sustainability Council) as a 2022 Green Grant award recipient. These efforts were led by Kenneth "KJ" Olsen, civil engineering undergraduate researcher who is now pursuing a Master of Civil Engineering (MCE) degree (expected May 2025). Professors Monique Head (Department of Civil Engineering) and Suresh Advani (Department of Mechanical Engineering and Center for Composite Materials) have been advising KJ and supporting the project efforts. Special thanks to Cameron Thacker for programming the interface to fetch the sensor data, Gary Wenczel, Structures & Geotechnical Lab Supervisor, and the companies who supported this project.'
                        }
                    </p>
                </article>
            </div>
            <div className="divider divider-horizontal px-10" />
            <div className="flex flex-col gap-y-14 animate-fadeInRight">
                <article className="prose">
                    <h1 className="text-nowrap">
                        {"What is the sensor reading?"}
                    </h1>
                    <p>
                        {
                            "The sensors are recording various weather conditions such as the temperature beneath (ground level) and inside of the concrete pavers, and compared to the ambient air temperature. Can you see the differences displayed in the plots below? Relative humidity is also being recorded using a weather station attached to the signage, and noted in the plots. "
                        }
                    </p>
                </article>

                <article className="prose">
                    <h1 className="text-nowrap">
                        {"Why are we monitoring the pavers?"}
                    </h1>
                    <p>
                        {
                            "We are monitoring the effects of different weather conditions and load (i.e., pedestrian and vehicular traffic) on the durability and long-term performance of the concrete pavers embedded with recycled waste products that would otherwise be placed in landfills."
                        }
                    </p>
                </article>
            </div>
        </div>
        <div className="w-2/3 h-2/3 flex flex-col gap-10 lg:hidden">
            <article className="prose">
                <h1 className="text-wrap md:text-nowrap text-xl">
                    {"Project Background and Acknowledgements"}
                </h1>
                <p className="text-sm">
                    {
                        'There are more than 1000 lbs of plastics and recycled waste products in these pavers that would otherwise have been placed in landfills! This project was selected and partially funded by the University of Delaware Office of Sustainability (formerly Sustainability Council) as a 2022 Green Grant award recipient. These efforts were led by Kenneth "KJ" Olsen, civil engineering undergraduate researcher who is now pursuing a Master of Civil Engineering (MCE) degree (expected May 2025). Professors Monique Head (Department of Civil Engineering) and Suresh Advani (Department of Mechanical Engineering and Center for Composite Materials) have been advising KJ and supporting the project efforts. Special thanks to Cameron Thacker for programming the interface to fetch the sensor data, Gary Wenczel, Structures & Geotechnical Lab Supervisor, and the companies who supported this project.'
                    }
                </p>
            </article>
            <article className="prose">
                <h1 className="text-wrap md:text-nowrap text-xl">
                    {"What is the sensor reading?"}
                </h1>
                <p className="text-sm">
                    {
                        "The sensors are recording various weather conditions such as the temperature beneath (ground level) and inside of the concrete pavers, and compared to the ambient air temperature. Can you see the differences displayed in the plots below? Relative humidity is also being recorded using a weather station attached to the signage, and noted in the plots. "
                    }
                </p>
            </article>

            <article className="prose">
                <h1 className="text-wrap md:text-nowrap text-xl">
                    {"Why are we monitoring the pavers?"}
                </h1>
                <p className="text-sm">
                    {
                        "We are monitoring the effects of different weather conditions and load (i.e., pedestrian and vehicular traffic) on the durability and long-term performance of the concrete pavers embedded with recycled waste products that would otherwise be placed in landfills."
                    }
                </p>
            </article>
        </div>
    </div>
);
