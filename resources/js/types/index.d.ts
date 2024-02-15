import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export declare enum Color {
    White = 0,
    Blue = 1,
    Black = 2,
    Red = 3,
    Green = 4,
}
export declare enum ColorIdentity {
    W = 0,
    U = 1,
    B = 2,
    R = 3,
    G = 4,
}
export declare enum Rarity {
    "Basic Land" = 0,
    Common = 1,
    Uncommon = 2,
    "Mythic Rare" = 3,
    Timeshifted = 4,
    Masterpiece = 5,
}
export declare enum Layout {
    normal = 0,
    split = 1,
    flip = 2,
    "double-faced" = 3,
    token = 4,
    plane = 5,
    scheme = 6,
    phenomenon = 7,
    leveler = 8,
    vanguard = 9,
}
export declare enum Legality {
    Legal = 0,
    Banned = 1,
    Restricted = 2,
}
export interface BlockLegality {
    format: string;
    legality: keyof typeof Legality;
}
export interface Card {
    name: string;
    manaCost: string;
    cmc: number;
    colors: (keyof typeof Color)[];
    colorIdentity: (keyof typeof ColorIdentity)[];
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    rarity: keyof typeof Rarity;
    set: string;
    setName: string;
    artist: string;
    flavor?: string;
    layout: keyof typeof Layout;
    multiverseid: number;
    imageUrl: string;
    variations: number[];
    printings: string[];
    originalText: string;
    originalType: string;
    legalities: BlockLegality[];
    id: string;
}

export interface DeckCard {
    name: string;
    id: string;
    imageUrl: string;
    count: number;
    multiverseid: number;
    cmc: number;
    type: string;
}

export interface Deck {
    id?: number;
    name: string;
    description: string;
    cards: DeckCard[];
    avgCmc: number;
    imageId: number | null;
    count: number;
    user_id?: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
