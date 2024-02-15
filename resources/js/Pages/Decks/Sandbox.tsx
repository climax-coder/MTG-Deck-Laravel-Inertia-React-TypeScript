import { Head } from "@inertiajs/react";
import EditDeck from "@/Components/Decks/EditDeck";
import { Deck } from "@/types";
import BackgroundImage from "@/Components/Common/BackgroundImage";

export default function Sandbox() {
    const deck: Deck = {
        name: "",
        description: "",
        cards: [],
        avgCmc: 0,
        imageId: null,
        count: 0,
    };

    return (
        <div className="relative p-10">
            <BackgroundImage className="bg-sandbox" />
            <Head title="Sandbox" />
            <EditDeck deck={deck} />
        </div>
    );
}
