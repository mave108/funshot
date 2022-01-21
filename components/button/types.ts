export enum ButtonTypes {
    PRIMARY = 'PRIMARY',
    DEFAULT =  'DEFAULT'
}
export interface ButtonProps {
    type: ButtonTypes;
    disabled?: boolean;
}