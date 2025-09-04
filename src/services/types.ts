import { UserRole, StoryState, OrderState } from "@prisma/client";
import { UserService } from "./user.service";
import { StoryService } from "./story.service";
import { OrderService } from "./order.service";

// ---------- User ----------
export interface CreateUserInput {
  fName: string;
  lName: string;
  username?: string;
  email?: string;
  password: string;
  phoneNumber?: string;
  role?: UserRole;
}
export type UpdateUserInput = Partial<CreateUserInput>;

// ---------- Story ----------
export interface CreateStoryInput {
  title: string;
  desc: string;
  miniDesc?: string;
  price?: number;
  state?: StoryState;
  userId: string;
  imageId?: string;
  pdfId?: string;
  orderId?: string;
}
export type UpdateStoryInput = Partial<CreateStoryInput>;

// ---------- Address ----------
export interface CreateAddressInput {
  city: string;
  street: string;
  houseNumber: string;
  userId: string;
}
export type UpdateAddressInput = Partial<CreateAddressInput>;

// ---------- Order ----------
export interface CreateOrderInput {
  storiesPrice?: number;
  deliveryPrice?: number;
  fPrice?: number;
  cNote?: string;
  ANote?: string;
  state?: OrderState;
  userId: string;
}
export type UpdateOrderInput = Partial<CreateOrderInput>;

// ---------- Image ----------
export interface CreateImageInput {
  url: string;
  alt?: string;
}
export type UpdateImageInput = Partial<CreateImageInput>;

// ---------- Pdf ----------
export interface CreatePdfInput {
  url: string;
}
export type UpdatePdfInput = Partial<CreatePdfInput>;

// ✅ User with relations (stories, orders, addresses)
export type UserWithRelations = Awaited<
  ReturnType<typeof UserService.getAllUsers>
>[0];

// ✅ Story with relations (user, order, image, pdf)
export type StoryWithRelations = Awaited<
  ReturnType<typeof StoryService.getAllStories>
>[0];

// ✅ Order with relations (user, stories, etc.)
export type OrderWithRelations = Awaited<
  ReturnType<typeof OrderService.getAllOrders>
>[0];
