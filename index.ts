import { Client } from 'tdl'
import { TDLib } from 'tdl-tdlib-addon'
import {ITelegramEvent} from "./app/domain/telegram/telegram-event";
import {IEvent} from "./app/domain/event";
import {transformTelegramEvent} from "./app/service/transformers";
import {IMappings} from "./app/service/mappers";
import {getMappings} from "./app/mappings-repo";


function createClient (mappings: IMappings): Client {
    const client = new Client(new TDLib(), {
        apiId: 000, // put your number here
        apiHash: '0123456789abcdef' // put your md5 here
    });

    client.on('error', console.error);
    client.on('update', update => {
        console.log('Received update:', (update as ITelegramEvent)._);
        const transformedEvent: IEvent | null = transformTelegramEvent(update, mappings)
        if (transformedEvent) {
            console.log(`${transformedEvent.messageType} in ${transformedEvent.region}! (${transformedEvent.timestamp})`);
            console.log(transformedEvent.originalMessage);
        }
    });

    return client;
}



async function main () {
    const mappings = await getMappings();
    const client = createClient(mappings);
    await client.connectAndLogin();
}

main()
