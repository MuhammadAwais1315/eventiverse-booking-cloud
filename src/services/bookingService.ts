
import { toast } from "sonner";

export interface CartItem {
  eventId: string;
  eventTitle: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

// LocalStorage keys
const CART_STORAGE_KEY = 'event-booking-cart';
const BOOKINGS_STORAGE_KEY = 'event-bookings';

// Interfaces
export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Mock user ID for demo purposes
const MOCK_USER_ID = "user-123";

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// Save cart to localStorage
export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Add item to cart
export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.eventId === item.eventId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity;
    toast.success(`Updated quantity for "${item.eventTitle}" in cart`);
  } else {
    // Add new item
    cart.push(item);
    toast.success(`Added "${item.eventTitle}" to cart`);
  }
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (eventId: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.eventId !== eventId);
  saveCart(updatedCart);
  toast.info(`Removed item from cart`);
  return updatedCart;
};

// Update cart item quantity
export const updateCartItemQuantity = (eventId: string, quantity: number) => {
  if (quantity < 1) return removeFromCart(eventId);
  
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.eventId === eventId ? { ...item, quantity } : item
  );
  
  saveCart(updatedCart);
  return updatedCart;
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
};

// Get all bookings
export const getBookings = (): Booking[] => {
  const bookingsJson = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return bookingsJson ? JSON.parse(bookingsJson) : [];
};

// Save bookings to localStorage
export const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

// Create a booking from cart
export const createBooking = () => {
  const cart = getCart();
  
  if (cart.length === 0) {
    toast.error("Your cart is empty");
    return null;
  }
  
  const bookings = getBookings();
  
  // Create a new booking for each item in cart
  const newBookings = cart.map(item => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const totalPrice = price * item.quantity;
    
    return {
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      eventId: item.eventId,
      eventTitle: item.eventTitle,
      userId: MOCK_USER_ID,
      quantity: item.quantity,
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: 'confirmed' as const
    };
  });
  
  // Add new bookings and save
  const updatedBookings = [...bookings, ...newBookings];
  saveBookings(updatedBookings);
  
  // Clear cart after booking
  clearCart();
  
  toast.success("Booking confirmed! Thank you for your purchase.");
  return newBookings;
};

// Get a booking by ID
export const getBookingById = (bookingId: string): Booking | undefined => {
  const bookings = getBookings();
  return bookings.find(booking => booking.id === bookingId);
};

// Get bookings for specific event
export const getBookingsByEventId = (eventId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.eventId === eventId);
};

// Cancel a booking
export const cancelBooking = (bookingId: string) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => 
    booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
  );
  
  saveBookings(updatedBookings);
  toast.info("Booking cancelled");
  return updatedBookings;
};
