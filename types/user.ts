// types/user.ts

// Enum untuk role
enum Role {
  user = "user",
  admin = "admin",
  consultant = "consultant",
  // Tambahkan role lain jika ada, misalnya admin, consultan, dll.
}

// Interface untuk Address (dari relasi addresses)
export interface Address {
  id: number;
  userId: number;
  street: string;
  regency_id?: number;
  district_id?: number;
  regency?: {
    id: number;
    name: string;
  };
  district?: {
    id: number;
    name: string;
    regency_id: number;
  };
}

// Interface untuk Consultation
interface Consultation {
  id: number;
  userId: number;
  consultanId: number;
  // Tambahkan field lain dari model Consultation jika ada
}

// Interface untuk ChatRoom
interface ChatRoom {
  id: number;
  userId: number;
  consultanId: number;
  // Tambahkan field lain dari model ChatRoom jika ada
}

// Interface untuk ChatMessage
interface ChatMessage {
  id: number;
  userId: number;
  chatRoomId: number;
  content: string;
  // Tambahkan field lain dari model ChatMessage jika ada
}

// Interface untuk Leaderboard
interface Leaderboard {
  id: number;
  userId: number;
  points: number;
  // Tambahkan field lain dari model Leaderboard jika ada
}

// Interface untuk PointLog
interface PointLog {
  id: number;
  userId: number;
  points: number;
  // Tambahkan field lain dari model PointLog jika ada
}

// Interface untuk Order
interface Order {
  id: number;
  userId: number;
  // Tambahkan field lain dari model Order jika ada
}

// Interface untuk UserEvent
interface UserEvent {
  id: number;
  userId: number;
  eventId: number;
  // Tambahkan field lain dari model UserEvent jika ada
}

// Interface untuk ConsultantCategory
interface ConsultantCategory {
  id: number;
  name: string;
  // Tambahkan field lain dari model ConsultantCategory jika ada
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string | null; // Nullable berdasarkan model
  avatar?: string | null; // Nullable berdasarkan model
  bio?: string | null; // Nullable berdasarkan model
  specialization?: string | null; // Nullable berdasarkan model
  role: Role; // Default ke "user"
  description: string;
  addresses: Address[]; // Relasi ke Address
  created_at: string; // DateTime dikonversi ke string untuk TypeScript
  consultations: Consultation[]; // Relasi ke Consultation (UserConsultations)
  consults: Consultation[]; // Relasi ke Consultation (ConsultanConsultations)
  chatRooms: ChatRoom[]; // Relasi ke ChatRoom (UserChatRooms)
  consultanRooms: ChatRoom[]; // Relasi ke ChatRoom (ConsultanChatRooms)
  messages: ChatMessage[]; // Relasi ke ChatMessage
  leaderboards: Leaderboard[]; // Relasi ke Leaderboard
  pointLogs: PointLog[]; // Relasi ke PointLog
  orders: Order[]; // Relasi ke Order (UserOrders)
  categoryId?: number | null; // Nullable berdasarkan model
  category?: ConsultantCategory | null; // Relasi ke ConsultantCategory
  userEvents: UserEvent[]; // Relasi ke UserEvent
}

export interface AddressData {
  name: string;
  phone: string;
  address: string;
}
