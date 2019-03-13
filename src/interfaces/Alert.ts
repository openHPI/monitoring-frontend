export default interface Alert {
    id: string;
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
    wasSnoozed: boolean;
    grafanaDashboardName: string;
    grafanaPanelID: number;
}
