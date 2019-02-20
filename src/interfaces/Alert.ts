export default interface Alert {
    message: string;
    title: string;
    subtitle: string;
    subsubtitle: string;
    time: string;
    level: string;
    backgroundColor: string;
    fqdn: string;
    serverInfo: {
        Hostname: string;
        ClusterID: string;
        ServerID: string;
    };
}
