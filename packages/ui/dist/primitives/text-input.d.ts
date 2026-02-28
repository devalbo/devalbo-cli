import React from 'react';
interface TextInputProps {
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    isDisabled?: boolean;
    suggestions?: string[];
}
export declare const TextInput: React.FC<TextInputProps>;
export {};
//# sourceMappingURL=text-input.d.ts.map