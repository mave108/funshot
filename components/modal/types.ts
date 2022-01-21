export interface ModalProps {
    show: boolean;
    close:()=> void;
    overlay?: boolean;
    backdrop?: boolean;
    title?: string;
    
}