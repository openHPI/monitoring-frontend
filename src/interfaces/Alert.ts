export default interface Alert {
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
