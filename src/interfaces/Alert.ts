export default interface Alert {
    _id: string;
    alertId: string;
    message: string;
    details: {
        Name: string;
        TaskName: string;
        Group: string;
        Tags: {
            [key: string]: string;
        };
        ServerInfo: {
            Hostname: string;
            ClusterID: string;
            ServerID: string;
        };
        ID: string;
        Fields: {
            [key: string]: number;
        };
        Level: string;
        Time: string;
        Duration: number
        Message: string;
    };
    time: string;
    duration: number;
    level: string;
    data: {
        series: {
            name: string;
            tags: {
                [key: string]: string;
            };
            columns: string[];
            values: string[];
        };
    };
    recoverable: boolean;
    __v: number;
}
