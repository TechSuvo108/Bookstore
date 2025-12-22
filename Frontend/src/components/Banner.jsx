import React, { useState } from 'react'
import banner from "../assets/Banner.jpg";
import toast from 'react-hot-toast';

const Banner = () => {

    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) {
            toast.error("Please enter your email 😊");
            return;
        }

        toast.success("Thanks for subscribing! 📚 You’ll receive book updates soon.");
        setEmail(""); // clear input
    };

    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10'>
                <div className='w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32'>
                    <div className='space-y-12'>
                        <h1 className='text-4xl font-bold'>
                            Hello, Welcome here to learn Something
                            <span className='text-pink-500'> new everyday!!!</span>
                        </h1>

                        <p className='text-xl'>
                            Explore a wide collection of books across fiction, non-fiction, academics, and self-growth. Whether you love stories or study materials, we have something for every reader.
                        </p>

                        <label className="input validator flex items-center gap-2">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>

                            <input
                                type="email"
                                placeholder="Enter your email for book updates"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <button
                        className="btn btn-secondary mt-6"
                        onClick={handleSubscribe}
                    >
                        Get Book Updates
                    </button>
                </div>

                <div className='order-1 w-full md:w-1/2'>
                    <img
                        src={banner}
                        alt="book-img"
                        className='w-95 md:w-155 h-80 md:h-120'
                    />
                </div>
            </div>
        </>
    )
}

export default Banner;
