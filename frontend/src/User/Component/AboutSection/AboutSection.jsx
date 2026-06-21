import React from "react"
import {Link} from 'react-router-dom'
import howtonavigate from "../../../assets/GCUguide how to navigate.webp"

const AboutSection = () => {
    return (
        <section className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 bg-[#e6eef5]">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                        <img
                            alt=""
                            src={howtonavigate}
                            className="absolute inset-0 h-full w-full"
                        />
                    </div>

                    <div className="lg:py-24 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 whitespace-normal xs:whitespace-nowrap font-oswald text-[#003da6]">
                                Navigate through the campus
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 font-oswald">
                                You can save your last location, navigate to your location.
                            </p>

                            <span className="inline-block text-base sm:text-lg font-semibold text-[#003da6] hover:text-[#002a73] transition-colors duration-300 cursor-pointer mb-6 font-oswald">
                                Read more about the app
                            </span>
                        </div>

                        <div className="mt-8">
                            <Link to="/about">
                                <button
                                    className="about-button font-oswald px-12 py-3 text-base sm:text-lg font-medium w-48 transition-all duration-300 ease-in-out"
                                    style={{
                                        backgroundColor: 'rgba(0, 61, 166, 255)',
                                        color: 'white',
                                        border: '2px solid rgba(0, 61, 166, 255)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = 'white';
                                        e.currentTarget.style.color = 'rgba(0, 61, 166, 255)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0, 61, 166, 255)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    About
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;