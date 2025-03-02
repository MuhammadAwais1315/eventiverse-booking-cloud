
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { Separator } from '@/components/ui/separator';
import { CartItem, getCart, updateCartItemQuantity, removeFromCart, createBooking } from '@/services/bookingService';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  // Taxes and fees (example: 10%)
  const taxesAndFees = subtotal * 0.1;
  
  // Total
  const total = subtotal + taxesAndFees;

  useEffect(() => {
    // Load cart from local storage
    setCartItems(getCart());
  }, []);

  const handleQuantityChange = (eventId: string, quantity: number) => {
    const updatedCart = updateCartItemQuantity(eventId, quantity);
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (eventId: string) => {
    const updatedCart = removeFromCart(eventId);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some events to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate backend processing
    setTimeout(() => {
      const bookings = createBooking();
      setIsLoading(false);
      
      if (bookings) {
        toast({
          title: "Order Confirmed!",
          description: "Your booking has been confirmed. Thank you for your purchase.",
        });
        
        navigate('/bookings');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <AnimatedSection animation="fade-in-up" className="mb-6">
            <Link 
              to="/events" 
              className="inline-flex items-center text-sm text-foreground/70 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue shopping
            </Link>
            
            <h1 className="text-3xl font-medium mt-4 flex items-center">
              <ShoppingCart className="h-6 w-6 mr-2" />
              Shopping Cart
              {cartItems.length > 0 && (
                <span className="ml-2 text-lg text-foreground/70">
                  ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
                </span>
              )}
            </h1>
          </AnimatedSection>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <AnimatedSection animation="fade-in" className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.eventId} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
                      <div className="w-full sm:w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.eventTitle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link to={`/events/${item.eventId}`} className="text-lg font-medium hover:text-accent transition-colors">
                          {item.eventTitle}
                        </Link>
                        
                        <div className="mt-1 flex justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-foreground/70">Price: {item.price}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <label className="text-sm text-foreground/70">Qty:</label>
                            <Input 
                              type="number" 
                              min="1" 
                              max="10"
                              className="w-16 h-8"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.eventId, parseInt(e.target.value) || 1)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.eventId)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </AnimatedSection>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <AnimatedSection animation="fade-in" delay={200}>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Taxes & Fees</span>
                        <span>${taxesAndFees.toFixed(2)}</span>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleCheckout}
                        disabled={isLoading}
                      >
                        <CreditCard className="h-4 w-4 mr-1.5" />
                        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                      </Button>
                      
                      <p className="text-xs text-foreground/60 text-center mt-2">
                        Secure checkout powered by Stripe
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          ) : (
            <AnimatedSection animation="fade-in" className="text-center py-12">
              <div className="max-w-md mx-auto">
                <ShoppingCart className="h-16 w-16 mx-auto text-foreground/30" />
                <h2 className="text-2xl font-medium mt-4">Your cart is empty</h2>
                <p className="text-foreground/70 mt-2 mb-6">
                  Looks like you haven't added any events to your cart yet.
                </p>
                <Link to="/events">
                  <Button>
                    Browse Events
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
