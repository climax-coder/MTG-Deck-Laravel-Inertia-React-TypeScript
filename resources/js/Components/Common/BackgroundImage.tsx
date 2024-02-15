import React, { HTMLAttributes } from "react";

const BackgroundImage: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...rest
}) => {
    return (
        <div
            className={`absolute inset-0 bg-cover bg-center transition duration-1000 ease-in-out filter blur-md ${className}`}
            {...rest}
        />
    );
};

export default BackgroundImage;
