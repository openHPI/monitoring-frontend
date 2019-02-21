export default interface Alert {
    id: string;
    message: string;
    time: string;
    level: string;
    backgroundColor: string;
    tags: {
        [key: string]: string;
    };
    fields: {
        [key: string]: number;
    };
}
