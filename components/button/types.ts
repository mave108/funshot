export enum ButtonTypes {
    PRIMARY = 'PRIMARY',
    DEFAULT = 'DEFAULT',
    WARNING = 'WARNING'
}
export interface ButtonProps {
    type: ButtonTypes;
    disabled?: boolean;
}