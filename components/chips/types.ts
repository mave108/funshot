import { ReactElement } from "react";
export enum ChipType {
   DEFAULT = 'DEFAULT',
   WARNING = 'WARNING'
}
export interface ChipProps {
    text: string;
    icon?: ReactElement;
    pulse?: boolean;
    bounce?: boolean;
    hoverText?: string;
    chipType?: ChipType;
    onClick?(item?: any): void;
}