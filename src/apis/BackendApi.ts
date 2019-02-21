import KapacitorEvent from '@/interfaces/KapacitorEvent';
import config from '@/config';

export default class BackendApi {
    // region public members
    // endregion

    // region private members
    // endregion

    // region constructor
    // endregion

    // region public methods
    public static async events(topicName: string): Promise<KapacitorEvent[]> {
        const response = await fetch(`${config.kapacitorProxyURL}/events/${topicName}?min-level=WARNING`);
        const topic = await response.json();
        return topic.events;
    }

    public static async snoozeEvent(topicName: string): Promise<void> {
        await fetch(`${config.kapacitorProxyURL}/events/${topicName}/snooze`);
    }
    // endregion

    // region private methods
    // endregion
}
