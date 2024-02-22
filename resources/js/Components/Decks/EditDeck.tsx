import React, { useState, useEffect, useContext, useCallback } from "react";
import { Deck, Card, DeckCard } from "@/types";
import PrimaryButton from "../Common/PrimaryButton";
import IconInput from "../Common/IconInput";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "@/Context/AppContext";
import { compareDecks } from "@/Utils/Index";
import { useForm } from "@inertiajs/react";
import DeckInput from "./DeckInput";
import CardImageWithActions from "../Cards/CardImageWithActions";
import EmptyCard from "../Common/EmptyCard";

interface EditDeckProps {
    deck: Deck;
}

const EditDeck: React.FC<EditDeckProps> = ({ deck }) => {
    const { data, setData, post, put } = useForm<Deck>({
        name: deck.name,
        description: deck.description,
        imageId: deck.imageId,
        cards: JSON.parse(JSON.stringify(deck.cards)),
        count: deck.count,
        avgCmc: deck.avgCmc,
    });

    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [disabled, setDisabled] = useState(true);

    const cards: Card[] = useContext(AppContext);

    useEffect(() => {
        const filtered = cards.filter((card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [cards, searchTerm]);

    useEffect(() => {
        const isValid = validateForm();
        const isSameAsInitial = compareDecks(data, deck);
        setDisabled(!isValid || isSameAsInitial);
    }, [data]);

    const handleChange = useCallback(
        (field: string, value: any) => {
            setData((prevData) => ({ ...prevData, [field]: value }));
        },
        [setData]
    );

    const validateForm = useCallback(() => {
        const newErrors: { [key: string]: string } = {};
        if (!data.name) {
            newErrors.name = "Please enter a deck name.";
        }
        if (!data.description) {
            newErrors.description = "Please enter a deck description.";
        }
        if (!data.imageId) {
            newErrors.imageId = "Please select a deck image";
        }
        if (data.count < 20 || data.count > 30) {
            newErrors.cards =
                "Please select at least 20 and maximum 30 cards for the deck.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [data]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (deck.name !== "" && deck.description !== "") {
                put(route("decks.update", { id: deck.id }));
            } else {
                post(route("decks.store"));
            }
        },
        [deck, post, data]
    );

    const handleAddCard = useCallback(
        (cardId: string) => {
            setData((prevData) => {
                const existingCard = prevData.cards.find(
                    (c: DeckCard) => c.id === cardId
                );
                let sumCmc = prevData.avgCmc * prevData.count;
                if (existingCard) {
                    existingCard.count++;
                    if (existingCard.type !== "Land") {
                        sumCmc += existingCard.cmc;
                    }
                } else {
                    const cardToAdd = cards.find((c) => c.id === cardId);
                    if (!cardToAdd) {
                        return { ...prevData };
                    }
                    prevData.cards.push({
                        name: cardToAdd.name,
                        id: cardToAdd.id,
                        imageUrl: cardToAdd.imageUrl,
                        count: 1,
                        multiverseid: cardToAdd.multiverseid,
                        cmc: cardToAdd.cmc,
                        type: cardToAdd.type,
                    });
                    if (cardToAdd.type !== "Land") {
                        sumCmc += cardToAdd.cmc;
                    }
                }
                prevData.count++;
                prevData.avgCmc = sumCmc / prevData.count;
                return { ...prevData };
            });
        },
        [setData]
    );

    const handleRemoveCard = useCallback(
        (cardId: string) => {
            setData((prevData) => {
                const cardIndex = prevData.cards.findIndex(
                    (c: DeckCard) => c.id === cardId
                );
                if (cardIndex !== -1) {
                    const card = prevData.cards[cardIndex];
                    if (card.count > 1) {
                        card.count--;
                    } else {
                        prevData.cards.splice(cardIndex, 1);
                    }
                    prevData.count--;
                    if (card.type !== "Land") {
                        let sum_cmc =
                            prevData.avgCmc * prevData.count - card.cmc;
                        if (prevData.count === 0) {
                            prevData.avgCmc = 0;
                        } else {
                            prevData.avgCmc = sum_cmc / prevData.count;
                        }
                    }
                }
                return { ...prevData };
            });
        },
        [setData]
    );

    const handleSetDeckImageId = useCallback(
        (cardId: string) => {
            setData((prevData) => {
                const cardIndex = cards.findIndex((c) => c.id === cardId);
                prevData.imageId = cards[cardIndex].multiverseid;
                return { ...prevData };
            });
        },
        [setData, cards]
    );

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <div className="sm:grid sm:grid-cols-2 gap-4">
                    <div className="mx-auto mt-5 bg-gray-200 w-[250px] h-[200px] border border-dashed border-gray-800 rounded-lg">
                        {data.imageId !== null ? (
                            <img
                                src={`../../images/decks/${data?.imageId}.jpg`}
                                alt={data.name}
                                className="w-[250px] h-[200px]"
                            />
                        ) : (
                            <EmptyCard
                                message="No deck image"
                                classNames="w-[250px] h-[200px]"
                            />
                        )}
                    </div>
                    <div className="">
                        <DeckInput
                            label="Deck Name"
                            value={data?.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            error={errors.name}
                        />
                        <DeckInput
                            label="Deck Description"
                            value={data?.description}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                            error={errors.description}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <label className="text-xl font-bold">
                        All Selected Cards
                    </label>
                    <div className="flex flex-wrap justify-around sm:justify-start items-center overflow-auto h-[350px] mt-5 p-5 gap-20 bg-gray-200 rounded-md">
                        {data?.cards && data.cards.length > 0 ? (
                            data.cards.map((_card: DeckCard) => (
                                <CardImageWithActions
                                    key={_card.id}
                                    card={_card}
                                    handleAddCard={handleAddCard}
                                    handleRemoveCard={handleRemoveCard}
                                    handleSetDeckImageId={handleSetDeckImageId}
                                    count={_card.count}
                                    checked={
                                        _card.multiverseid === data.imageId
                                    }
                                />
                            ))
                        ) : (
                            <div className="flex flex-start items-center justify-center sm:justify-start p-3 w-full h-full bg-gray-200">
                                <EmptyCard
                                    message="No card"
                                    classNames="w-[223px] h-[310px]"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="my-10 flex justify-center">
                    <PrimaryButton
                        className="w-[100%] sm:w-[300px] h-[50px] flex justify-center"
                        type="submit"
                        disabled={disabled}
                    >
                        {deck.name !== "" && deck.description !== ""
                            ? "Update"
                            : "Save"}
                    </PrimaryButton>
                </div>
            </form>
            <div>
                <div className="flex justify-center py-5">
                    <IconInput
                        icon={FaSearch}
                        placeholder="Search cards..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap justify-around sm:justify-start bg-gray-200 overflow-auto h-[600px] mt-5 p-5 gap-20">
                    {filteredCards.map((_card) => (
                        <CardImageWithActions
                            key={_card.id}
                            card={_card}
                            handleAddCard={handleAddCard}
                            handleRemoveCard={handleRemoveCard}
                            count={
                                data.cards.find(
                                    (c: DeckCard) => c.id === _card.id
                                )?.count
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EditDeck;
