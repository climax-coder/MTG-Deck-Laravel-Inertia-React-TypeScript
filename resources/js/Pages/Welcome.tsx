import { Link, Head } from "@inertiajs/react";
import { Deck, PageProps } from "@/types";
import IconInput from "@/Components/Common/IconInput";
import { FaSearch } from "react-icons/fa";
import DeckList from "@/Components/Decks/DeckList";
import EmptyCard from "@/Components/Common/EmptyCard";
import BackgroundImage from "@/Components/Common/BackgroundImage";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    decks,
}: PageProps<{ laravelVersion: string; phpVersion: string; decks: Deck[] }>) {
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const searchQuery = e.currentTarget.value.trim();
            if (searchQuery) {
                window.location.href = route("decks.all", {
                    name: searchQuery,
                });
            }
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-[88vh] bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white p-10">
                <BackgroundImage className="bg-welcome" />
                <div className="flex justify-center items-center p-10 my-20">
                    <IconInput
                        icon={FaSearch}
                        placeholder="Search decks..."
                        onKeyDown={handleSearch}
                    />
                </div>
                {decks?.length > 0 ? (
                    <DeckList decks={decks} />
                ) : (
                    <EmptyCard message="No Deck" />
                )}
            </div>
        </>
    );
}
