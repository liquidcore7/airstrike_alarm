import {IRegionMapping} from "../domain/region-mapping";
import {IMessageTypeMapping} from "../domain/message-mapping";
import {Region} from "../domain/region";
import {MessageType} from "../domain/message-type";


export interface IMappings {
    readonly regionMapping: IRegionMapping[];
    readonly messageTypeMapping: IMessageTypeMapping[];
}


export function getRegion (channelId: number, mappings: IMappings): Region | null {
    return mappings
        .regionMapping
        .find(mappingEntry => mappingEntry.channelId === channelId)
        ?.region || null;
}

export function getMessageType(channelId: number, messageBody: string, mappings: IMappings): MessageType | null {
    const mappingEntry: IMessageTypeMapping | null = mappings
        .messageTypeMapping
        .find(mappingEntry => mappingEntry.channelId === channelId) || null;

    if (mappingEntry == null) {
        return null;
    } else if (messageBody.match(mappingEntry.alarmStartMask)) {
        return MessageType.ALARM_START;
    } else if (messageBody.match(mappingEntry.alarmEndMask)) {
        return MessageType.ALARM_END;
    } else {
        return null;
    }
}
