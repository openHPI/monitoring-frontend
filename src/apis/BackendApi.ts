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
        const response = await fetch(`http://82.140.0.78:8082/events/${topicName}?min-level=WARNING`);
        const topic = await response.json();
        return topic.events;
    }

    public static async snoozeEvent(eventId: string, days: number): Promise<void> {
        await fetch(`http://82.140.0.78:8082/events/snooze/`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId, days }),
        });
    }

    public static async unsnoozeEvent(eventId: string): Promise<void> {
        await fetch(`http://82.140.0.78:8082/events/unsnooze/`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId }),
        });
    }
    // endregion

    // region private methods
    // endregion
}
