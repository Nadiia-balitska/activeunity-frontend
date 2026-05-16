import { notFound } from "next/navigation";

import { eventService } from "@/api/eventService";
import { EventDetailsContent } from "@/features/events/components/EventDetailsContent";

interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  try {
    const event = await eventService.getEventById(id);

    return <EventDetailsContent event={event} />;
  } catch {
    notFound();
  }
}