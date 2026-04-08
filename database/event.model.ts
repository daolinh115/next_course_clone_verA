import { Schema, model, models, Document } from 'mongoose';
import slugify from 'slugify'; // Bạn có thể cần cài thư viện này: npm install slugify

// 1. Định nghĩa Interface cho TypeScript
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Định nghĩa Schema
const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  overview: { type: String, required: true },
  image: { type: String, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  audience: { type: String, required: true },
  agenda: { type: [String], required: true },
  organizer: { type: String, required: true },
  tags: { type: [String], required: true },
}, { timestamps: true });

// 3. Pre-save Hook: Tạo Slug và Chuẩn hóa Date
EventSchema.pre('save', async function() {
  // Chỉ tạo lại slug nếu title thay đổi
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  
  // 2. Chuẩn hóa Date (Ví dụ đơn giản bằng JS thuần)
  if (this.isModified('date')) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Định dạng ngày tháng không hợp lệ!');
    }
    this.date = parsedDate.toISOString(); // Chuyển về chuẩn ISO 8601
  }
});

const Event = models.Event || model<IEvent>('Event', EventSchema);
export default Event;