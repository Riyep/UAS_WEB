// src/pages/Headline.js
import React from "react";
import Card from "../components/Card";
import Navbar from "@/Components/navbar";

const Headline = ({ headlines }) => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
                {headlines.map((headline) => (
                    <Card
                        key={headline.id}
                        title={headline.title}
                        content={headline.description}
                        imageUrl={headline.urlToImage}
                        link={headline.url}
                    />
                ))}
            </div>
        </div>
    );
};

export default Headline;
