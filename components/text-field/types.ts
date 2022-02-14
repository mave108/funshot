import React from "react";

//React.HTMLFactory<HTMLInputElement>

export interface TextFieldProps  {
   name: string;
   defaultValue?: string;
   placeholder?: string;
   disabled?: boolean;
   value?: string; 
   onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
   onKeyUp?(e: React.KeyboardEvent<HTMLInputElement>): void;
   onKeyPress?(e: React.KeyboardEvent<HTMLInputElement>): void;
}