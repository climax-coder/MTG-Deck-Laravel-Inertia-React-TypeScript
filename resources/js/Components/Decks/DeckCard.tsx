import React from "react";
import { Deck } from "@/types";
import { Link } from "@inertiajs/react";
interface DeckCardProps {
    deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
    return (
        <div className="relative border rounded-md text-center bg-gray-100 m-auto w-[250px] h-[300px]">
            {deck.imageId && (
                <img
                    src={`../../images/decks/${deck.imageId}.jpg`}
                    alt={deck.name}
                    className="w-[250px] h-[200px]"
                />
            )}
            <div className="p-3">
                <h2 className="text-xl font-semibold uppercase">{deck.name}</h2>
                <p className="text-gray-500">{deck.description}</p>
                <p>CMC: {deck.avgCmc.toFixed(2)}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Link
                    href={route("deck.show", { id: deck.id })}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default DeckCard;
