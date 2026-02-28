import React from 'react';
export interface SelectItem {
    label: string;
    value: string;
}
interface SelectProps {
    items: SelectItem[];
    onSelect: (item: SelectItem) => void;
}
export declare const Select: React.FC<SelectProps>;
export {};
//# sourceMappingURL=select.d.ts.map