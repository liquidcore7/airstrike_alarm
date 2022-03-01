import {IMappings} from "./service/mappers";
import {Region} from "./domain/region";

const stubMappings: IMappings = {
    regionMapping: [
        {
            channelId: -1001532113550,
            region: Region.LVIV
        }
    ],
    messageTypeMapping: [
        {
            channelId: -1001532113550,
            alarmStartMask: '.*start.*',
            alarmEndMask: '.*end.*'
        }
    ]
}

export async function getMappings (): Promise<IMappings> {
    return Promise.resolve(stubMappings);
}
