import {
  UserRole,
  StoryState,
  OrderState,
  ORDERTYPE,
  GENDER,
} from "@prisma/client";
import { UserService } from "./user.service";
import { StoryService } from "./story.service";
import { OrderService } from "./order.service";

// ---------- User ----------
export interface CreateUserInput {
  fName: string;
  lName: string;
  username: string;
  email?: string;
  password: string;
  phoneNumber?: string;
  role?: UserRole;
}
export type UpdateUserInput = Partial<CreateUserInput>;

// ---------- Story ----------
export interface CreateStoryInput {
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  miniDescEn?: string;
  miniDescAr?: string;
  state?: StoryState;

  // Media (URLs, not relations)
  imageEnUrl?: string;
  imageArUrl?: string;
  pdfEnUrl?: string;
  pdfArUrl?: string;
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

  city: string;
  street: string;
  houseNumber: string;

  name: string;
  age: number;
  hobbies: string;
  language: string;
  description: string;
  gender: GENDER;

  // Optional fields
  hair_color?: string;
  hair_style?: string;
  eye_color?: string;
  skin_tone?: string;
  clothing_description?: string;
  accessory_description?: string;
  personality_traits?: string;
  moral_value?: string;

  child_image: string;
  type?: ORDERTYPE; // COD / VISA
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

// ✅ Story with relations
export type StoryWithRelations = Awaited<
  ReturnType<typeof StoryService.getAllStories>
>[0];

// ✅ Order with relations
export type OrderWithRelations = Awaited<
  ReturnType<typeof OrderService.getAllOrders>
>[0];
