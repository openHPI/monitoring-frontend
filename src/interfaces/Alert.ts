export default interface Alert {
    id: string;
    message: string;
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
