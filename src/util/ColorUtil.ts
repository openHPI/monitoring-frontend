export interface States {
    [prop: string]: string;
}

export default class ColorUtil {
    public static colors: States = {
        OK: '#58B050',
        INFO: '#000000',
        WARNING: '#B2B051',
        CRITICAL: '#B0544D',
    };

    public static getColor(state: string): string {
        return this.colors[state];
    }
}
