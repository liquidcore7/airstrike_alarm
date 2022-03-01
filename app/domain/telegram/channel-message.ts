import {ITelegramEvent} from "./telegram-event";

interface IMessageBody extends ITelegramEvent {
    readonly _: string;
    readonly text: string;
}

interface IMessageText extends ITelegramEvent {
    readonly _: 'messageText';
    readonly text: IMessageBody;
}

export interface IChannelMessage extends ITelegramEvent {
    readonly _: string,
    readonly message: {
        chat_id: number,
        content: IMessageText
    }
}

export function isChannelMessage (event: ITelegramEvent): event is IChannelMessage {
    return event._ === 'updateNewMessage';
}
