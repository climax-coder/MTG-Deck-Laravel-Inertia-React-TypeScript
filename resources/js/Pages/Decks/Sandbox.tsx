import { Head } from "@inertiajs/react";
import EditDeck from "@/Components/Decks/EditDeck";
import { Deck } from "@/types";
import BackgroundImage from "@/Components/Common/BackgroundImage";

interface Props {
    deck?: Deck;
}

const defaultDeck: Deck = {
    name: "",
    description: "",
    cards: [],
    avgCmc: 0,
    imageId: null,
    count: 0,
};

const Sandbox: React.FC<Props> = ({ deck = defaultDeck }) => {
    return (
        <div className="relative p-10">
            <BackgroundImage className="bg-sandbox" />
            <Head title="Sandbox" />
            <EditDeck deck={deck} />
        </div>
    );
};

export default Sandbox;
