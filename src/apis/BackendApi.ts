import KapacitorEvent from '@/interfaces/KapacitorEvent';

export default class BackendApi {
    // region public members
    // endregion

    // region private members
    // endregion

    // region constructor
    // endregion

    // region public methods
    public static async events(topicName: string): Promise<KapacitorEvent[]> {
        const response = await fetch(`http://82.140.0.78:8082/events/${topicName}?min-level=OK`);
        const topic = await response.json();
        return topic.events;
    }
    // endregion

    // region private methods
    // endregion
}
