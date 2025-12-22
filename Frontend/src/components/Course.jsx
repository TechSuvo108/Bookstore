import React from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Course = () => {
  const [book, setBook] = useState([])
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");

        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, [])
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We’re delighted to have you 
            <span className="text-pink-500"> here! :)</span>
          </h1>

          <p className="mt-12">
            Welcome to your learning space. Explore curated courses designed to help you build skills, improve knowledge, and learn at your own pace.
          </p>
          <Link to="/">
            <button className="mt-6 btn btn-secondary rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        {/* Cards section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {book.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>

      </div>
    </>
  );
};

export default Course;
