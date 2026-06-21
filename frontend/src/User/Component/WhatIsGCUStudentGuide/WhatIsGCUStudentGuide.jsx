import React from "react"
import { Link } from 'react-router-dom'
import about1 from "../../../assets/about1.webp"
import about2 from "../../../assets/about2.webp"

const WhatIsGCUStudentGuide = () => {
    return (
        <div className="bg-white p-4 my-8">
            <div className="md:max-w-5xl max-w-xl mx-auto">
                <div className="text-center mb-12 -mt-[11px]"> 
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">
                        About
                    </h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600 font-light">
                        Discover the GCU Guide Map and how it enhances your campus experience.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-16 items-center"> 
                    <div className="text-left">
                        <p className="mb-4 text-lg md:text-xl font-oswald">
                            The GCU Guide Map is an innovative tool designed to enhance the experience of students, staff, and visitors at GCU by providing a comprehensive and easy-to-use campus navigation system. Whether you're new to the university or a long-time member of the community, the map offers an intuitive way to explore the campus.
                        </p>
                        <p className="mb-4 text-lg md:text-xl font-oswald">
                            With detailed indoor and outdoor navigation, it covers every building, classroom, and facility across the university, ensuring that you can quickly find your way around. Students can locate lecture halls, libraries, and study spaces with ease, while visitors can pinpoint essential facilities like parking lots, cafeterias, and administration offices.
                        </p>
                        <p className="text-lg md:text-xl font-oswald">
                            The map also highlights important areas like campus landmarks, recreational spaces, and emergency services, making it an indispensable resource for anyone on campus.
                        </p>
                    </div>
                    <div className="flex justify-center items-center"> 
                        <img 
                            src={about1} 
                            alt="Placeholder Image" 
                            className="rounded-lg object-cover w-full max-w-md h-auto shadow-lg" 
                        />
                    </div>
                </div>
                <hr className="border-gray-300 my-16 border-t-2" /> 
                <div className="grid md:grid-cols-2 gap-16 items-center"> 
                    <div className="flex justify-center items-center max-md:order-2"> 
                        <img 
                            src={about2}
                            alt="Placeholder Image" 
                            className="rounded-lg object-cover w-full max-w-md h-auto shadow-lg" 
                        />
                    </div>
                    <div className="text-left max-md:order-1"> 
                        <p className="mb-4 text-lg md:text-xl font-oswald">
                            The GCU Guide Map integrates advanced technology, such as GPS and indoor positioning systems, to offer real-time directions both inside and outside buildings. This makes it perfect for students navigating large or unfamiliar lecture complexes, or for new visitors trying to find specific departments or event locations.
                        </p>
                        <p className="mb-4 text-lg md:text-xl font-oswald">
                            In addition to offering step-by-step navigation, the guide includes key information about building accessibility, departmental contacts, and even estimated walking times between locations.
                        </p>
                        <p className="mb-4 text-lg md:text-xl font-oswald">
                            As a fully responsive web and mobile application, the map is designed to be accessible from any device, allowing users to plan their routes before arriving on campus or navigate efficiently in real-time.
                        </p>
                        <p className="text-lg md:text-xl font-oswald">
                            Overall, the GCU Guide Map is a user-friendly, indispensable tool that helps make navigating the campus a hassle-free experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhatIsGCUStudentGuide;