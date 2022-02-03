export enum ProgressbarType{   
   PRIMARY = 'PRIMARY',
   SUCCESS = 'SUCCESS',
   WARNING = 'WARNING',
   ERROR   = 'ERROR'
}
export interface ProgressbarProps{
    progress: number;
    type ?: ProgressbarType
}