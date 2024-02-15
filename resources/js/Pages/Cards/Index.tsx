import React, { useState, useEffect, useContext } from "react";
import { Head } from "@inertiajs/react";
import { Card } from "@/types";
import CardList from "@/Components/Cards/CardList";
import { AppContext } from "@/Context/AppContext";
import IconInput from "@/Components/Common/IconInput";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import EmptyCard from "@/Components/Common/EmptyCard";

export default function Index() {
    const cards: Card[] = useContext(AppContext);
    const [filteredCards, setFilteredCards] = useState<Card[]>(cards);

    const handleSearch = debounce((searchQuery: string) => {
        const filtered = cards.filter((card) =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCards(filtered);
    }, 300);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        handleSearch(searchQuery);
    };

    return (
        <div className="relative min-h-[88vh] bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white p-10">
            <Head title="Cards" />
            <div className="flex justify-center p-5 sm:p-20">
                <IconInput
                    icon={FaSearch}
                    placeholder="Search cards..."
                    onChange={handleChange}
                />
            </div>
            {filteredCards.length > 0 ? (
                <CardList cards={filteredCards} />
            ) : (
                <EmptyCard message="No Card" classNames="w-[223px] h-[310px]" />
            )}
        </div>
    );
}
