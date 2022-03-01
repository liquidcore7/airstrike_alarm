import {IInboundEvent} from "../domain/telegram/inbound-event";
import {IEvent} from "../domain/event";
import {getMessageType, getRegion, IMappings} from "./mappers";
import {IChannelMessage, isChannelMessage} from "../domain/telegram/channel-message";
import {isTelegramEvent} from "../domain/telegram/telegram-event";


export function parseTelegramMessage (message: IInboundEvent, mappings: IMappings): IEvent | null {
    const region = getRegion(message.channelId, mappings);
    const messageType = getMessageType(message.channelId, message.messageBody, mappings);

    if (region == null || messageType == null) {
        return null;
    } else {
        const timestamp = new Date(); // TODO: utc
        return {
            region: region,
            messageType: messageType,
            originalMessage: message.messageBody,
            timestamp: timestamp
        }
    }
}

export function parseTelegramUpdate (update: any): IInboundEvent | null {
    if (isTelegramEvent(update)) {
        if (isChannelMessage(update)) {
            return {
                channelId: update.message.chat_id,
                messageBody: update.message.content.text.text
            }
        }
    }
    return null;
}
