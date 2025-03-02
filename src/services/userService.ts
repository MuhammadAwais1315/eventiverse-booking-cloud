
// This is a frontend service that will communicate with a backend user service
// when it's implemented. For now, it uses localStorage for demo purposes.

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignupData extends AuthCredentials {
  name: string;
}

class UserService {
  private currentUser: User | null = null;
  private authToken: string | null = null;
  
  constructor() {
    // Initialize from localStorage (if available)
    this.loadUserFromStorage();
  }
  
  private loadUserFromStorage() {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('authToken');
      
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
      
      if (storedToken) {
        this.authToken = storedToken;
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    }
  }
  
  private saveUserToStorage() {
    try {
      if (this.currentUser) {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem('user');
      }
      
      if (this.authToken) {
        localStorage.setItem('authToken', this.authToken);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }
  
  // In a real implementation, this would call the backend API
  async signin(credentials: AuthCredentials): Promise<User> {
    // Simulate API call
    console.log('Signing in with:', credentials.email);
    
    // This is where we would make a real API call
    // const response = await fetch('/api/auth/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials)
    // });
    // const data = await response.json();
    
    // For demo purposes, we'll create a fake user and token
    const mockUser: User = {
      id: '123',
      name: 'Demo User',
      email: credentials.email,
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    // Save the user and token
    this.currentUser = mockUser;
    this.authToken = mockToken;
    this.saveUserToStorage();
    
    return mockUser;
  }
  
  async signup(data: SignupData): Promise<User> {
    // Simulate API call
    console.log('Signing up with:', data.email);
    
    // This is where we would make a real API call
    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // const responseData = await response.json();
    
    // For demo purposes, we'll create a fake user and token
    const mockUser: User = {
      id: '123',
      name: data.name,
      email: data.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    // Save the user and token
    this.currentUser = mockUser;
    this.authToken = mockToken;
    this.saveUserToStorage();
    
    return mockUser;
  }
  
  async signout(): Promise<void> {
    // This is where we would make a real API call to invalidate the token
    // await fetch('/api/auth/signout', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${this.authToken}` }
    // });
    
    // Clear user and token
    this.currentUser = null;
    this.authToken = null;
    this.saveUserToStorage();
  }
  
  getUser(): User | null {
    return this.currentUser;
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUser && !!this.authToken;
  }
  
  getAuthToken(): string | null {
    return this.authToken;
  }
  
  // In a real implementation, this would call the backend API
  async updateProfile(userData: Partial<User>): Promise<User> {
    if (!this.currentUser || !this.authToken) {
      throw new Error('User not authenticated');
    }
    
    // This is where we would make a real API call
    // const response = await fetch('/api/users/profile', {
    //   method: 'PUT',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.authToken}`
    //   },
    //   body: JSON.stringify(userData)
    // });
    // const data = await response.json();
    
    // For demo purposes, we'll update the user locally
    this.currentUser = {
      ...this.currentUser,
      ...userData
    };
    
    this.saveUserToStorage();
    
    return this.currentUser;
  }
}

// Create a singleton instance
const userService = new UserService();

export default userService;
export type { User, AuthCredentials, SignupData };
