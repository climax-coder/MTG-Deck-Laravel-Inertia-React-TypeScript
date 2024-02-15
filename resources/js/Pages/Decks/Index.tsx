import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Deck } from "@/types";
import IconInput from "@/Components/Common/IconInput";
import { FaSearch } from "react-icons/fa";
import DeckList from "@/Components/Decks/DeckList";
import { debounce } from "lodash";
import EmptyCard from "@/Components/Common/EmptyCard";
import BackgroundImage from "@/Components/Common/BackgroundImage";

interface Props {
    decks: Deck[];
}

const Index: React.FC<Props> = ({ decks }) => {
    const [filteredDecks, setFilteredDecks] = useState<Deck[]>(decks);
    const handleSearch = debounce((searchQuery: string) => {
        const filtered = decks.filter((deck) =>
            deck.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDecks(filtered);
    }, 300);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        handleSearch(searchQuery);
    };

    return (
        <div className="relative min-h-[88vh] bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white p-10">
            <Head title="Decks" />
            <BackgroundImage className="bg-dashboard" />
            <div className="flex justify-center p-5 sm:p-20">
                <IconInput
                    icon={FaSearch}
                    placeholder="Search decks..."
                    onChange={handleChange}
                />
            </div>
            {filteredDecks.length > 0 ? (
                <DeckList decks={filteredDecks} />
            ) : (
                <div className="relative p-3">
                    <EmptyCard
                        message="No Deck"
                        classNames="w-[223px] h-[310px]"
                    />
                </div>
            )}
        </div>
    );
};

export default Index;
