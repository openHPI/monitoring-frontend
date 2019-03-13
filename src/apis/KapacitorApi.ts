import KapacitorTask from '@/interfaces/KapacitorTask';
import KapacitorTaskVariables from '@/interfaces/KapacitorTaskVariables';

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

    public static async tasks(): Promise<KapacitorTask[]> {
        const response = await fetch(`http://82.140.0.78:9092/kapacitor/v1/tasks`);
        const responseJSON = await response.json();
        return responseJSON.tasks;
    }

    public static async templates(): Promise<KapacitorTask[]> {
        const response = await fetch(`http://82.140.0.78:9092/kapacitor/v1/templates`);
        const responseJSON = await response.json();
        return responseJSON.templates;
    }

    public static async updateTaskVariables(taskName: string, taskVariables: KapacitorTaskVariables): Promise<string> {
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

    public static async deleteTask(taskName: string): Promise<void> {
        await fetch(`http://82.140.0.78:9092/kapacitor/v1/tasks/${taskName}`, {
            method: 'DELETE',
        });
    }
    // endregion

    // region private methods
    // endregion
}
