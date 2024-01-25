// src/components/Card.js
import React from "react";

const Card = ({ title, content, imageUrl, link }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            {imageUrl && (
                <img
                    className="w-full h-48 object-cover object-center"
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
            {link && (
                <div className="px-6 pt-4 pb-2">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Read more
                    </a>
                </div>
            )}
        </div>
    );
};

export default Card;
