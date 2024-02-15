import { Head } from "@inertiajs/react";
import EditDeck from "@/Components/Decks/EditDeck";
import { Deck } from "@/types";
import BackgroundImage from "@/Components/Common/BackgroundImage";

interface Props {
    deck: Deck;
}

const UpdateDeck: React.FC<Props> = ({ deck }) => {
    return (
        <div className="relative p-10">
            <BackgroundImage className="bg-sandbox" />
            <Head title="Sandbox" />
            <EditDeck deck={deck} />
        </div>
    );
};

export default UpdateDeck;
