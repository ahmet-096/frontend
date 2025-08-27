import React, { useRef, useState } from "react";

interface AutocompleteInputProps {
    name: string;
    placeholder: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (value: string) => void;
    required?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
    name,
    placeholder,
    value,
    options,
    onChange,
    onSelect,
    required,
}) => {
    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative">
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-blue-50 rounded-lg px-4 py-3 font-semibold border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                autoComplete="off"
                ref={inputRef}
                required={required}
                onFocus={() => setShow(true)}
                onBlur={() => setTimeout(() => setShow(false), 100)}
            />
            {show && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto">
                    {options
                        .filter(opt => opt.toLowerCase().includes(value.toLowerCase()))
                        .map(opt => (
                            <li
                                key={opt}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                                onMouseDown={() => {
                                    onSelect(opt);
                                    setShow(false);
                                    inputRef.current?.focus();
                                }}
                            >
                                {opt}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;