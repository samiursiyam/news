import Image from "next/image";
import React from "react";
import Nevlink from "./Nevlink";

const Navbar = () => {

    const date = new Date().toLocaleDateString("bn-nd", {
        dateStyle: "full"
    })

    return (
        <div>
            {/* Top bar */}
            <div className="container mx-auto mt-4 mb-4 px-3 sm:px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 relative">

                    {/* Logo + Title */}
                    <div className="flex items-center gap-2 order-1 sm:order-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                        <Image
                            src="/assets/logo.webp"
                            alt="logo"
                            width={50}
                            height={50}
                            className="w-10 h-10 sm:w-12 sm:h-12"
                        />
                        <div className="text-center sm:text-left">
                            <h1 className="text-lg sm:text-2xl text-red-700 font-bold whitespace-nowrap">
                                Bangla News 24
                            </h1>
                            <div className="text-xs sm:text-sm text-gray-600">{date}</div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 order-2 sm:order-1 sm:ml-auto">
                        <button className="btn btn-sm sm:btn-md text-xs sm:text-sm">সাইন ইন</button>
                        <button className="btn btn-sm sm:btn-md bg-red-700 text-white text-xs sm:text-sm">
                            সাইন আপ
                        </button>
                    </div>
                </div>
            </div>

            <Nevlink />
        </div>
    );
};

export default Navbar;