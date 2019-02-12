export default interface Event {
    link: {
        rel: string;
        href: string;
    };
    id: string;
    state: {
        message: string,
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
        duration: string;
        level: string;
    };
}
