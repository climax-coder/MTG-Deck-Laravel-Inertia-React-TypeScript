import React from "react";
import { Deck } from "@/types";
import DeckCard from "./DeckCard";

interface DeckListProps {
    decks: Deck[];
}

const DeckList: React.FC<DeckListProps> = ({ decks }) => {
    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {decks.map((deck, index) => (
                <DeckCard key={index} deck={deck} />
            ))}
        </div>
    );
};

export default DeckList;
