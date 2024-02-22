import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Deck } from "@/types";
import IconInput from "@/Components/Common/IconInput";
import { FaSearch } from "react-icons/fa";
import DeckList from "@/Components/Decks/DeckList";
import EmptyCard from "@/Components/Common/EmptyCard";
import BackgroundImage from "@/Components/Common/BackgroundImage";

interface Props {
    name: string;
    decks: Deck[];
}

const Index: React.FC<Props> = ({ name, decks }) => {
    const { url } = usePage();
    const currentPath = url.split("?")[0];
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const searchQuery = e.currentTarget.value.trim();
            router.visit(`${currentPath}?name=${searchQuery}`);
        }
    };

    return (
        <div className="relative min-h-[88vh] bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white p-10">
            <Head title="Decks" />
            <BackgroundImage className="bg-dashboard" />
            <div className="flex justify-center p-5 sm:p-20">
                <IconInput
                    icon={FaSearch}
                    defaultValue={name}
                    placeholder="Search decks..."
                    onKeyDown={handleSearch}
                />
            </div>
            {decks.length > 0 ? (
                <DeckList decks={decks} />
            ) : (
                <div className="relative flex justify-center sm:justify-start p-3">
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
