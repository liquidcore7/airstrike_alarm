export interface ITelegramEvent {
    readonly _: string;
}

export function isTelegramEvent(possibleEvent: any): possibleEvent is ITelegramEvent {
    return ((possibleEvent as ITelegramEvent)._ || '').length > 0;
}
