import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Card } from "@/types";

export const AppContext = createContext<Card[]>([]);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(
                    "https://api.magicthegathering.io/v1/cards"
                );
                const data = await response.json();
                setCards(data.cards.filter((card: Card) => card.multiverseid));
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, []);

    return <AppContext.Provider value={cards}>{children}</AppContext.Provider>;
};
