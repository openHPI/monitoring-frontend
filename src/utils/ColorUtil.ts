export interface States {
    [prop: string]: number;
}

export interface Colors {
    [prop: string]: string;
}

export default class ColorUtil {
    public static states: States = {
        OK: 0,
        INFO: 1,
        WARNING: 2,
        CRITICAL: 3,
    };

    public static colors: Colors = {
        OK: '#58B050',
        INFO: '#000000',
        WARNING: '#B2B051',
        CRITICAL: '#B0544D',
    };

    public static getColor(state: string): string {
        return this.colors[state];
    }
}
