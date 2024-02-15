interface ImageProps {
    imageUrl: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ imageUrl, alt }) => (
    <div className="mx-auto mt-5 bg-gray-200 w-[250px] h-[200px] border border-dashed border-gray-800 rounded-lg">
        {imageUrl !== "" && (
            <img src={imageUrl} alt={alt} className="w-[250px] h-[200px]" />
        )}
    </div>
);

export default Image;
