import { Deck, DeckCard } from "../types";

function compareDecks(deckA: Deck, deckB: Deck): boolean {
    const nameMatch = deckA.name === deckB.name;
    const descriptionMatch = deckA.description === deckB.description;
    const imageIdMatch = deckA.imageId === deckB.imageId;
    const cardsMatch = compareCardArrays(deckA.cards, deckB.cards);

    return nameMatch && descriptionMatch && imageIdMatch && cardsMatch;
}

function compareCardArrays(cardsA: DeckCard[], cardsB: DeckCard[]): boolean {
    if (cardsA.length !== cardsB.length) {
        return false;
    }

    const sortedA = cardsA.slice().sort((a, b) => a.id.localeCompare(b.id));
    const sortedB = cardsB.slice().sort((a, b) => a.id.localeCompare(b.id));

    for (let i = 0; i < sortedA.length; i++) {
        const cardMatch = compareDeckCards(sortedA[i], sortedB[i]);
        if (!cardMatch) {
            return false;
        }
    }

    return true;
}

function compareDeckCards(cardA: DeckCard, cardB: DeckCard): boolean {
    const countMatch = cardA.count === cardB.count;
    const cardMatch = cardA.id === cardB.id;
    return countMatch && cardMatch;
}

export { compareDecks, compareDeckCards };
