import { Region } from './region';
import { MessageType } from './message-type';


export interface IEvent {
    readonly region: Region;
    readonly messageType: MessageType;
    readonly timestamp: Date;
    readonly originalMessage: string;
}
