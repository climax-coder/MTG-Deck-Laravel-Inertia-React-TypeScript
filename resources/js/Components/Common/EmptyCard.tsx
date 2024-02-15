import React from "react";
import InputError from "./InputError";

interface EmptyCardProps {
    message: string;
    classNames?: string;
}

const EmptyCard: React.FC<EmptyCardProps> = ({ message, classNames }) => {
    return (
        <div
            className={`flex justify-center items-center border border-dashed border-gray-800 rounded-lg bg-gray-200 ${classNames}`}
        >
            <InputError message={message} />
        </div>
    );
};

export default EmptyCard;
