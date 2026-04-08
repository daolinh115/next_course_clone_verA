import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
}

const BookingSchema = new Schema<IBooking>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
  email: { 
    type: String, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
  },
}, { timestamps: true });

// Pre-save hook: Kiểm tra EventId có tồn tại không
BookingSchema.pre('save', async function(next) {
  const eventExists = await Event.findById(this.eventId);
  if (!eventExists) {
    throw new Error('Event does not exist. Cannot create booking.');
  }
  next();
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);
export default Booking;