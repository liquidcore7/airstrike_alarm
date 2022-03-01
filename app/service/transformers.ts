import {IEvent} from "../domain/event";
import {parseTelegramMessage, parseTelegramUpdate} from "./parsers";
import {IMappings} from "./mappers";


export function transformTelegramEvent (event: any, mappings: IMappings): IEvent | null {
    const telegramUpdate = parseTelegramUpdate(event)
    return telegramUpdate ? parseTelegramMessage(telegramUpdate, mappings) : null
}
