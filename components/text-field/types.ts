export interface TextFieldProps {
   name: string;
   defaultValue?: string;
   placeholder?: string;
   disabled?: boolean; 
   onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}