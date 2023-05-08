import { OnEvent } from '@nestjs/event-emitter';

// Only events used by application:
export enum StripeEvents {
  DeleteSubscription = 'customer.subscription.deleted',
  UpdateSubscription = 'customer.subscription.updated',
}

export function createEventName(event: string) {
  return `stripe.${event}`;
}

export const StripeEventHandler = (event: StripeEvents) =>
  OnEvent(createEventName(event));
