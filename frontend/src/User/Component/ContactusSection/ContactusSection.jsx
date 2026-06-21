import React from "react"
import {Link} from 'react-router-dom'
import contactus from "../../../assets/contactus-image.webp"

const ContactusSection = () => {
    return (
        <section className="bg-[#ffffff]">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="lg:py-24 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-6 whitespace-normal xs:whitespace-nowrap font-oswald text-[#003da6]">
                                Need to get in touch with us?
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 font-oswald">
                                Either fill out the form with your inquiry or find the appropriate email address to contact below.
                            </p>

                            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 font-oswald">
                                For more information about the GCU Student Guide application, please check our frequently asked questions page.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-14"> 
                                <div className="flex justify-start">
                                    <Link to="/contact-us">
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
                                            Contact Us
                                        </button>
                                    </Link>
                                </div>
                                <div className="flex justify-start">
                                    <Link to="/meet-the-team">
                                        <button
                                            className="about-button font-oswald px-12 py-3 text-base sm:text-lg font-medium w-670 transition-all duration-300 ease-in-out"
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
                                            Meet The Team
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                        <img
                            alt=""
                            src={contactus}
                            className="absolute inset-0 h-full w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactusSection;