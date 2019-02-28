export default interface KapacitorEvent {
    link: {
        rel: string;
        href: string;
    };
    id: string;
    state: {
        message: string,
        title: string;
        subtitle: string;
        subsubtitle: string;
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
            GrafanaDashboardName: string;
            GrafanaPanelID: number;
        };
        time: string;
        duration: string;
        level: string;
        wasSnoozed: boolean;
    };
}
