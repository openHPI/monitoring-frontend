import axios from 'axios';

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
        await axios.patch(`http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`, {
            vars: taskVariables,
        });

        await axios.patch(`http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`, {
            status: 'disabled',
        });

        await axios.patch(`http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`, {
            status: 'enabled',
        });

        return 'OK';
    }
    // endregion

    // region private methods
    // endregion
}
