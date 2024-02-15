import React from "react";
import { Card } from "@/types";
import { Link } from "@inertiajs/react";

interface Props {
    cards: Card[];
}

const CardList: React.FC<Props> = ({ cards }) => {
    if (cards.length === 0) {
        return;
    }

    return (
        <div className="m-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative m-auto w-[240px] h-[360px]"
                    >
                        <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="m-auto"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Link
                                href={`/cards/${card.id}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                View
                            </Link>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg text-center font-semibold mb-2">
                                {card.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;
