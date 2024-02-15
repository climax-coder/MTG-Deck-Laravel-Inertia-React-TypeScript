import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Deck, PageProps } from "@/types";
import { usePage, useForm } from "@inertiajs/react";
import CardImageWithActions from "@/Components/Cards/CardImageWithActions";
import DangerButton from "@/Components/Common/DangerButton";
import BackgroundImage from "@/Components/Common/BackgroundImage";

interface Props {
    deck: Deck;
}

const DeckDetail: React.FC<Props> = ({ deck }) => {
    const { auth } = usePage<PageProps>().props;
    const enabled = auth.user?.id === deck?.user_id;
    const { delete: destroy } = useForm();

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this deck?")) {
            try {
                await destroy(route("decks.destroy", { id: deck.id }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="relative min-h-[88vh] p-20">
            <Head title={deck.name} />
            <BackgroundImage className="bg-deck" />
            <div className="relative md:grid md:grid-cols-2">
                <div>
                    <div className="mx-auto bg-gray-200 border border-dashed border-gray-800 rounded-lg w-[300px]">
                        <img
                            src={`../../images/decks/${deck.imageId}.jpg`}
                            alt={deck.name}
                            className="w-[300px] h-[240px] rounded-lg"
                        />
                    </div>
                </div>
                <div className="w-[300px] mx-auto p-5 bg-indigo-100 rounded-lg mt-10 md:mt-0">
                    <h1 className="text-3xl font-bold mb-4 uppercase">
                        {deck?.name}
                    </h1>
                    <p className="text-gray-600 mb-2">{deck?.description}</p>
                    <div className="flex items-center mb-4">
                        <p className="text-gray-700 mr-4">
                            Average CMC:{" "}
                            <span className="font-semibold">
                                {deck?.avgCmc && deck.avgCmc.toFixed(2)}
                            </span>
                        </p>
                        <p className="text-gray-700">
                            Cards Count:{" "}
                            <span className="font-semibold">{deck?.count}</span>
                        </p>
                    </div>
                    {enabled && (
                        <div className="grid grid-cols-2 gap-10 mt-10">
                            <div className="flex justify-end">
                                <Link
                                    href={route("deck.edit", { id: deck.id })}
                                    className="bg-blue-500 text-white text-xs uppercase font-semibold tracking-widest px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                >
                                    Edit
                                </Link>
                            </div>
                            <div className="flex">
                                <DangerButton
                                    onClick={handleDelete}
                                    children={"delete"}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap mt-20 gap-20">
                {deck.cards.map((_card) => (
                    <CardImageWithActions
                        key={_card.id}
                        card={_card}
                        count={_card.count}
                    />
                ))}
            </div>
        </div>
    );
};

export default DeckDetail;
