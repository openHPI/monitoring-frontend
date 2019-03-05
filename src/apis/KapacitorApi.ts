export default class KapacitorApi {
    // region public members
    // endregion

    // region private members
    // endregion

    // region constructor
    // endregion

    // region public methods
    public static async alertLevel(topicName: string): Promise<string> {
        const response = await fetch('http://82.140.0.78:9092/kapacitor/v1/alerts/topics');
        const topics = await response.json();
        const test = topics.topics.find((topic: any) => topic.id === topicName);
        return test ? test.level : 'OK';
    }

    public static async taskVariables(taskName: string): Promise<any> {
        const response = await fetch(`http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`);
        const topic = await response.json();
        return topic.vars;
    }

    public static async updateTaskVariables(taskName: string, taskVariables: any): Promise<string> {
        const taskURL = `http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`;

        await fetch(taskURL, {
            method: 'PATCH',
            body: JSON.stringify({ vars: taskVariables }),
        });

        await fetch(taskURL, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'disabled' }),
        });

        await fetch(taskURL, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'enabled' }),
        });

        return 'OK';
    }
    // endregion

    // region private methods
    // endregion
}
