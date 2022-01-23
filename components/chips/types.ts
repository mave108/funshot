import { ReactElement } from "react";
export enum ChipType {
   PRIMARY = 'PRIMARY',
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
    timeout?:number;
    autoHide?: boolean;
    onClick?(item?: any): void;
}