export default interface Alert {
    message: string;
    title: string;
    subtitle: string;
    subsubtitle: string;
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
