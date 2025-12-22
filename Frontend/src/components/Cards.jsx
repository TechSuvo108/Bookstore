import React from "react";

const Cards = ({ item }) => {
  return (
    <div className="px-2 py-3">
      <div
        className="card bg-base-100 border border-base-300
                   shadow-md rounded-xl overflow-hidden flex flex-col h-[420px]
                   transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        {/* Image */}
        <figure className="h-40 sm:h-48 w-full">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover rounded-t-xl"
          />
        </figure>

        {/* Body */}
        <div className="card-body flex flex-col p-4 sm:p-6 flex-grow">
          {/* Title */}
          <h2 className="card-title text-sm sm:text-base flex flex-col gap-1 mb-2">
            {item.name}
            <span className="badge badge-secondary w-fit text-xs">
              {item.category}
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base flex-grow line-clamp-4 sm:line-clamp-none">
            {item.title}
          </p>

          {/* Bottom section */}
          <div className="mt-4 flex flex-col gap-2">
            <span className="badge badge-outline w-fit">{`₹${item.price}`}</span>
            <button
              className="cursor-pointer px-3 py-1 rounded-full border-2 border-base-300
                         hover:bg-pink-500 hover:text-white duration-200 w-full">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
