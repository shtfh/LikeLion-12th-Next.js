import { Fragment } from 'react';

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventLogistics from '../../components/event-detail/event-logistics';

import EventSummary from '../../components/event-detail/event-summary';

import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';



function EventDetailPage(props) {
    const event = props.selectedEvent;
    console.log('event', event);
    console.log(props);

    if (!event) {
        return (
            <div className="center">
                <p>Loading</p>
            </div>
        );
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}
export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);
    console.log('Fetched event:', event); 

    return {
        props: {
            selectedEvent: event,
        },
        revalidate: 30,
    };
}
export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map((event) => ({ params: { eventId: event.id } }));
    return {
        paths: paths,
        fallback: blocking,
    };
}
export default EventDetailPage;