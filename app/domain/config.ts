export interface IConfig {
    readonly apiId: number;
    readonly apiHash: string;
    readonly userPhone: string;
    readonly mfaCode?: number;
}
