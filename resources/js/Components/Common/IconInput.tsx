import React, {
    forwardRef,
    useState,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    ComponentType,
} from "react";

type IconInputProps = {
    icon?: ComponentType<{ className?: string }>;
} & InputHTMLAttributes<HTMLInputElement>;

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
    ({ icon: Icon, className = "", ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current!);

        useEffect(() => {
            if (isFocused && localRef.current) {
                localRef.current.focus();
            }
        }, [isFocused, localRef]);

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        return (
            <div className="relative sm:w-[600px] w-[300px]">
                <input
                    {...props}
                    ref={localRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full h-12 sm:text-xl text-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-sm shadow-lg pl-6 ${
                        Icon ? "pr-10" : "pr-3"
                    } ${
                        isFocused ? "focus:shadow-amber-500/40" : ""
                    } ${className}`}
                />{" "}
                {Icon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Icon
                            className={`h-5 w-5 ${
                                isFocused ? "text-gray-700" : "text-gray-400"
                            }`}
                        />
                    </div>
                )}
            </div>
        );
    }
);

export default IconInput;
