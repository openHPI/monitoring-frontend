export default interface Alert {
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
    taskName: string;
}
