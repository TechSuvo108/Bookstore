import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from "axios";

const Freebook = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const freeBooks = res.data.filter((data) => data.category === "Free");
        console.log(freeBooks);
        setBook(freeBooks);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  return (
    <div className="w-full mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>
          Explore our collection of free books available for all readers. Enjoy quality reads without any cost and discover new authors, genres, and ideas.
        </p>
      </div>

      <div className="freebook-slider w-full">
        <Slider {...settings}>
          {book.map((item) => (
            <div key={item._id} className="card w-full p-2">
              <Cards item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Freebook;
