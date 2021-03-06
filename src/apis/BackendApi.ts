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

    public static async alertLevel(topicName: string): Promise<string> {
        const response = await fetch(`${config.kapacitorProxyURL}/events/${topicName}?min-level=WARNING`);
        const topic = await response.json();

        if (topic.events.length === 0) {
            return 'OK';
        }

        const criticalEvent = topic.events.find((event: KapacitorEvent) => event.state.level === 'CRITICAL');
        return criticalEvent ? 'CRITICAL' : 'WARNING';
    }

    public static async snoozeEvent(eventId: string, days: number): Promise<void> {
        await fetch(`${config.kapacitorProxyURL}/events/snooze/`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId, days }),
        });
    }

    public static async unsnoozeEvent(eventId: string): Promise<void> {
        await fetch(`${config.kapacitorProxyURL}/events/unsnooze/`, {
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
