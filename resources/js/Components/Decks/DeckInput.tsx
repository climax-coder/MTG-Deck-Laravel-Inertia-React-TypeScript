import InputLabel from "../Common/InputLabel";
import TextInput from "../Common/TextInput";
import InputError from "../Common/InputError";

interface DeckInputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const DeckInput: React.FC<DeckInputProps> = ({
    label,
    value,
    onChange,
    error,
}) => (
    <div className="mt-5">
        <InputLabel htmlFor={label} value={label} />
        <TextInput
            id={label}
            type="text"
            name={label}
            value={value}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={onChange}
        />
        {error && <InputError message={error} className="mt-2" />}
    </div>
);

export default DeckInput;
