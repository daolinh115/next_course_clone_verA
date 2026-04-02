import mongoose from 'mongoose';

/** 1. Lấy chuỗi kết nối từ biến môi trường
 * Retrieve the connection string from environment variables
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/** 2. Định nghĩa kiểu dữ liệu cho biến Cache để tránh dùng "any"
 * Define types for the cached connection to avoid using "any"
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/** 3. Khởi tạo biến global để lưu trữ kết nối
 * Initialize a global variable to store the connection
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  /** 4. Nếu đã có kết nối, trả về luôn để tiết kiệm tài nguyên
   * If a connection exists, return it immediately
   */
  if (cached.conn) {
    return cached.conn;
  }

  /** 5. Nếu chưa có kết nối, tạo một Promise mới
   * If no connection exists, create a new connection promise
   */
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Tắt hàng đợi lệnh nếu chưa kết nối - Disable command buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('--- MongoDB Connected Successfully ---');
      return mongooseInstance;
    });
  }

  try {
    // Chờ Promise hoàn thành và lưu vào cache
    // Wait for the promise and store it in the cache
    cached.conn = await cached.promise;
  } catch (e) {
    // Nếu lỗi, xóa promise để lần sau có thể thử lại
    // If error, reset the promise so we can try again
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;