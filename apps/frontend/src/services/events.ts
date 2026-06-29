import { API_URL } from "./api";

export function connectEvents(

    jobId: string,

    onMessage: (data: any) => void

) {

    const eventSource =

        new EventSource(

            `${API_URL}/events/${jobId}`

        );

    eventSource.onmessage = (

        event

    ) => {

        const parsed =

            JSON.parse(

                event.data

            );

        onMessage(parsed);

    };

    eventSource.onerror = () => {

        eventSource.close();

    };

    return eventSource;

}