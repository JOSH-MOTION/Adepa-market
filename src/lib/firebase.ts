import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// These can be supplied via process.env.NEXT_PUBLIC_FIREBASE_...
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let auth: any = null;
let db: any = null;
let isUsingFirebase = false;

// Check if we have minimum valid keys to initialize Firebase
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    isUsingFirebase = true;
  } catch (error) {
    console.error("Firebase initialization failed, falling back to local simulation:", error);
  }
}

// Simulated Local Auth and Database
class LocalAuthSimulation {
  private listeners: Function[] = [];
  private currentUser: any = null;

  constructor() {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("adepa_user");
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }

  onAuthStateChanged(callback: Function) {
    this.listeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private triggerListeners() {
    this.listeners.forEach((callback) => callback(this.currentUser));
  }

  async signUp(email: string, pass: string, name: string) {
    if (typeof window === "undefined") return;
    const users = JSON.parse(localStorage.getItem("adepa_users_db") || "[]");
    if (users.find((u: any) => u.email === email)) {
      throw new Error("Email already in use.");
    }
    const newUser = { uid: "usr_" + Math.random().toString(36).substr(2, 9), email, displayName: name };
    users.push({ ...newUser, password: pass });
    localStorage.setItem("adepa_users_db", JSON.stringify(users));
    this.currentUser = newUser;
    localStorage.setItem("adepa_user", JSON.stringify(newUser));
    this.triggerListeners();
    return newUser;
  }

  async login(email: string, pass: string) {
    if (typeof window === "undefined") return;
    const users = JSON.parse(localStorage.getItem("adepa_users_db") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === pass);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    this.currentUser = { uid: user.uid, email: user.email, displayName: user.displayName };
    localStorage.setItem("adepa_user", JSON.stringify(this.currentUser));
    this.triggerListeners();
    return this.currentUser;
  }

  async logout() {
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("adepa_user");
    }
    this.triggerListeners();
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

class LocalDatabaseSimulation {
  async addOrder(orderData: any) {
    if (typeof window === "undefined") return "ord_mock_" + Date.now();
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    const newOrder = {
      ...orderData,
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("adepa_orders_db", JSON.stringify(orders));
    return newOrder;
  }

  async getOrder(orderId: string) {
    if (typeof window === "undefined") return null;
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    return orders.find((o: any) => o.id === orderId) || null;
  }

  async updateOrderStatus(orderId: string, status: string) {
    if (typeof window === "undefined") return;
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    const updated = orders.map((o: any) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem("adepa_orders_db", JSON.stringify(updated));
  }
}

export const localAuth = new LocalAuthSimulation();
export const localDb = new LocalDatabaseSimulation();
export { auth, db, isUsingFirebase };
