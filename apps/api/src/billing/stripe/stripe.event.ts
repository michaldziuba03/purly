import { StripeEvents } from './stripe.webhook';
import { OnEvent } from '@nestjs/event-emitter';

export function stripeEventName(eventType: StripeEvents) {
  return `stripe.${eventType}`;
}

export function OnStripeEvent(eventType: StripeEvents) {
  return OnEvent(stripeEventName(eventType));
}
