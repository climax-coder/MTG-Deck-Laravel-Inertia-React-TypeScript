import { Card, DeckCard } from "@/types";
import React from "react";
import { FaCheck, FaPlus, FaMinus } from "react-icons/fa";

interface Props {
    card: Card | DeckCard;
    handleAddCard?: (id: string) => void;
    handleRemoveCard?: (id: string) => void;
    handleSetDeckImageId?: (id: string) => void;
    count?: number;
}

const CardImageWithActions: React.FC<Props> = ({
    card,
    handleSetDeckImageId,
    handleAddCard,
    handleRemoveCard,
    count,
}) => {
    return (
        <div className="relative w-[223px] h-[310px]">
            <img
                src={card.imageUrl}
                alt={card.name}
                className="m-auto object-cover rounded-lg"
            />
            <div className="absolute top-10 right-[-1.25rem] w-10 flex flex-col gap-3">
                {handleAddCard && (
                    <div
                        className="flex justify-center items-center rounded-full text-green-800 border border-green-800 w-10 h-10 bg bg-gray-100"
                        onClick={() => handleAddCard(card.id)}
                    >
                        <FaPlus />
                    </div>
                )}
                {count && (
                    <div className="flex justify-center items-center rounded-full font-semibold text-lg text-white border border-orange-800 w-10 h-10 bg bg-green-600">
                        {count}
                    </div>
                )}
                {handleRemoveCard && (
                    <div
                        className="flex justify-center items-center rounded-full text-amber-800 border border-amber-800 w-10 h-10 bg bg-gray-100"
                        onClick={() => handleRemoveCard(card.id)}
                    >
                        <FaMinus />
                    </div>
                )}
                {handleSetDeckImageId && (
                    <div
                        className="flex justify-center items-center rounded-full text-green-500 border border-amber-800 w-10 h-10 bg bg-gray-100"
                        onClick={() => handleSetDeckImageId(card.id)}
                    >
                        <FaCheck />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardImageWithActions;
