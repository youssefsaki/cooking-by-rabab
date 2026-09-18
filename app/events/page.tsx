import { redirect } from 'next/navigation';

/** Weekly Event is retired — send leftover /events traffic to packages. */
export default function EventsPage() {
  redirect('/packages');
}
