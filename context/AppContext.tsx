"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// TypeScript Interfaces
export interface Product {
  id: string;
  name: string;
  nameId: string;
  tagline: string;
  taglineId: string;
  price: number; // in IDR
  roastLevel: "Light" | "Medium" | "Dark" | "Medium-Dark" | "Light-Medium";
  roastLevelId: string;
  altitude: string;
  process: string;
  processId: string;
  variety: string;
  tastingNotes: string[];
  tastingNotesId: string[];
  image: string;
  description: string;
  descriptionId: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grindSize: string; // "Whole Bean" | "V60" | "Espresso" | "French Press"
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingName: string;
  shippingAddress: string;
  courier: string;
  paymentMethod: string;
  status: "ordered" | "roasting" | "packaging" | "shipped" | "delivered";
  trackingLogs: { time: string; message: string; messageId: string }[];
}

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

// English and Indonesian Translation Dictionary
export const translationDictionary = {
  en: {
    brandName: "PT Biji Kopi Nusantara",
    navHome: "Home",
    navAbout: "About Us",
    navProducts: "Shop Beans",
    navOrigins: "Origins Map",
    navBrewing: "Brewing Academy",
    navContact: "Contact",
    navTrack: "Track Order",
    cartTitle: "Your Reserve Cart",
    cartEmpty: "Your cart is currently empty.",
    cartSubtotal: "Subtotal",
    cartTax: "Tax (11% VAT)",
    cartTotal: "Total Amount",
    cartCheckout: "Proceed to Checkout",
    cartBackToShop: "Back to Shop",
    checkoutTitle: "Specialty Secure Checkout",
    checkoutStep1: "Shipping Info",
    checkoutStep2: "Select Payment",
    checkoutStep3: "Receipt Confirmation",
    checkoutFormName: "Full Name / Company Name",
    checkoutFormEmail: "Email Address",
    checkoutFormPhone: "WhatsApp Number",
    checkoutFormProvince: "Province",
    checkoutFormCity: "City",
    checkoutFormAddress: "Detailed Street Address",
    checkoutFormPostal: "Postal Code",
    checkoutFormCourier: "Preferred Premium Courier",
    checkoutFormCourierOption: "Select courier...",
    checkoutPayMethod: "Select Payment Method",
    checkoutPayQRIS: "QRIS Premium (Scan & Pay Instantly)",
    checkoutPayVA: "Virtual Account (Bank Mandiri / BCA)",
    checkoutPayCC: "Credit Card (Visa / Mastercard)",
    checkoutPlaceOrder: "Confirm Order & Pay",
    checkoutSuccess: "Payment Confirmed Successfully!",
    checkoutOrderNumber: "Order Identifier Number",
    checkoutTrackingInstruction: "Use this code to track your roast in real-time.",
    checkoutClose: "Close Checkout",
    loginTitle: "Enter BKN Club",
    loginSubtitle: "Sign in to save custom profiles and trace direct shipments.",
    loginEmail: "Email Address",
    loginPassword: "Password",
    loginButton: "Sign In",
    loginSignupTab: "Create Account",
    loginSigninTab: "Sign In",
    loginFullName: "Full Name",
    loginRegisterButton: "Create Premium Account",
    loginLogout: "Sign Out",
    trackTitle: "Roast & Order Tracker",
    trackSubtitle: "Enter your unique Order ID to view dynamic micro-roasting status",
    trackPlaceholder: "e.g., BKN-GAYO-101",
    trackButton: "Search Tracker",
    trackNotFound: "No matching order found. Please check your ID and try again.",
    trackStatusOrdered: "Order Confirmed",
    trackStatusRoasting: "Roasting Master Batch",
    trackStatusPackaging: "Hermetic Valve Packaging",
    trackStatusShipped: "Dispatched & In Transit",
    trackStatusDelivered: "Arrived at Destination",
    trackNotes: "Roasting details",
    whatsappPreset: "Hello, I am interested in PT Biji Kopi Nusantara's premium specialty coffee beans. Can you assist me?",
  },
  id: {
    brandName: "PT Biji Kopi Nusantara",
    navHome: "Beranda",
    navAbout: "Tentang Kami",
    navProducts: "Beli Biji Kopi",
    navOrigins: "Peta Asal",
    navBrewing: "Akademi Seduh",
    navContact: "Kontak",
    navTrack: "Lacak Pesanan",
    cartTitle: "Keranjang Belanja Premium Anda",
    cartEmpty: "Keranjang belanja Anda kosong saat ini.",
    cartSubtotal: "Subtotal",
    cartTax: "Pajak (PPN 11%)",
    cartTotal: "Total Pembayaran",
    cartCheckout: "Lanjutkan ke Pembayaran",
    cartBackToShop: "Kembali Belanja",
    checkoutTitle: "Pembayaran Aman Specialty",
    checkoutStep1: "Informasi Pengiriman",
    checkoutStep2: "Metode Pembayaran",
    checkoutStep3: "Konfirmasi Penerimaan",
    checkoutFormName: "Nama Lengkap / Nama Perusahaan",
    checkoutFormEmail: "Alamat Email",
    checkoutFormPhone: "Nomor WhatsApp",
    checkoutFormProvince: "Provinsi",
    checkoutFormCity: "Kota / Kabupaten",
    checkoutFormAddress: "Alamat Jalan Lengkap",
    checkoutFormPostal: "Kode Pos",
    checkoutFormCourier: "Kurir Premium Pilihan",
    checkoutFormCourierOption: "Pilih kurir...",
    checkoutPayMethod: "Pilih Metode Pembayaran",
    checkoutPayQRIS: "QRIS Premium (Pindai & Bayar Instan)",
    checkoutPayVA: "Virtual Account (Bank Mandiri / BCA)",
    checkoutPayCC: "Kartu Kredit (Visa / Mastercard)",
    checkoutPlaceOrder: "Konfirmasi & Bayar Pesanan",
    checkoutSuccess: "Pembayaran Terkonfirmasi Berhasil!",
    checkoutOrderNumber: "Nomor Identifikasi Pesanan",
    checkoutTrackingInstruction: "Gunakan kode ini untuk melacak proses penyangraian secara real-time.",
    checkoutClose: "Tutup Pembayaran",
    loginTitle: "Masuk ke BKN Club",
    loginSubtitle: "Masuk untuk menyimpan profil kustom dan melacak pengiriman langsung.",
    loginEmail: "Alamat Email",
    loginPassword: "Kata Sandi",
    loginButton: "Masuk",
    loginSignupTab: "Buat Akun",
    loginSigninTab: "Masuk",
    loginFullName: "Nama Lengkap",
    loginRegisterButton: "Buat Akun Premium",
    loginLogout: "Keluar Sesi",
    trackTitle: "Pelacak Penyangraian & Pesanan",
    trackSubtitle: "Masukkan ID Pesanan Anda untuk melihat status penyangraian mikro secara dinamis",
    trackPlaceholder: "contoh: BKN-GAYO-101",
    trackButton: "Cari Pelacak",
    trackNotFound: "Pesanan tidak ditemukan. Mohon periksa kembali ID Anda.",
    trackStatusOrdered: "Pesanan Dikonfirmasi",
    trackStatusRoasting: "Proses Penyangraian Mikro",
    trackStatusPackaging: "Pengemasan Katup Kedap Udara",
    trackStatusShipped: "Dalam Pengiriman",
    trackStatusDelivered: "Tiba di Tujuan",
    trackNotes: "Detail penyangraian",
    whatsappPreset: "Halo, saya tertarik dengan biji kopi premium specialty dari PT Biji Kopi Nusantara. Bisa dibantu?",
  }
};

// Premium Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "gayo",
    name: "Sumatra Aceh Gayo",
    nameId: "Sumatra Aceh Gayo",
    tagline: "Volcanic earth & deep cedar tones",
    taglineId: "Tanah vulkanis & nuansa cedar yang mendalam",
    price: 135000,
    roastLevel: "Medium-Dark",
    roastLevelId: "Medium-Dark",
    altitude: "1,450 - 1,600m",
    process: "Wet Hulled (Giling Basah)",
    processId: "Giling Basah (Wet Hulled)",
    variety: "Abyssinia & Ateng",
    tastingNotes: ["Dark Chocolate", "Spices", "Cedar", "Blackberry"],
    tastingNotesId: ["Cokelat Hitam", "Rempah-rempah", "Kayu Cedar", "Blackberry"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    description: "Sourced directly from organic smallholder cooperatives in the Gayo Highlands. Known for its intense rich body, smooth low acidity, and deep exotic spicy finish.",
    descriptionId: "Diperoleh langsung dari koperasi petani kecil organik di Dataran Tinggi Gayo. Terkenal dengan kekentalan tubuh yang intens, keasaman rendah yang lembut, dan rasa akhir rempah eksotis yang mendalam.",
    rating: 4.9
  },
  {
    id: "toraja",
    name: "Sulawesi Toraja Sapan",
    nameId: "Sulawesi Toraja Sapan",
    tagline: "Elegant body with sparkling berry acidity",
    taglineId: "Kekentalan elegan dengan keasaman berry berkilau",
    price: 145000,
    roastLevel: "Medium",
    roastLevelId: "Medium",
    altitude: "1,600 - 1,800m",
    process: "Full Washed",
    processId: "Full Washed (Cuci Penuh)",
    variety: "S795 & Typica",
    tastingNotes: ["Red Apple", "Brown Sugar", "Cinnamon", "Herbal"],
    tastingNotesId: ["Apel Merah", "Gula Aren", "Kayu Manis", "Herbal"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    description: "Hailing from the high altitude volcanic slopes of Mount Sesean, Toraja. This single origin displays an elegant balance of dark fruit notes and velvet molasses.",
    descriptionId: "Berasal dari lereng vulkanis dataran tinggi Gunung Sesean, Toraja. Single origin ini menampilkan keseimbangan elegan dari rasa buah gelap dan molase beludru.",
    rating: 4.8
  },
  {
    id: "kintamani",
    name: "Bali Kintamani Honey",
    nameId: "Bali Kintamani Honey",
    tagline: "Sweet citrus blossoms & nectar glaze",
    taglineId: "Bunga jeruk manis & glasir nektar",
    price: 150000,
    roastLevel: "Light-Medium",
    roastLevelId: "Light-Medium",
    altitude: "1,200 - 1,350m",
    process: "Honey Process",
    processId: "Proses Honey",
    variety: "USDA 762 & Bourbon",
    tastingNotes: ["Orange Blossom", "Honey", "Lime", "Plum"],
    tastingNotesId: ["Bunga Jeruk", "Madu", "Jeruk Nipis", "Plum"],
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=600",
    description: "Grown alongside citrus orchards in Bali, the Honey Process leaves natural mucilage on the bean, resulting in an exceptionally sweet, bright, and fruit-forward specialty cup.",
    descriptionId: "Ditanam di samping kebun jeruk di Bali, Proses Honey menyisakan lendir buah alami pada biji kopi, menghasilkan secangkir kopi yang sangat manis, cerah, dan berkarakter buah segar.",
    rating: 5.0
  },
  {
    id: "flores",
    name: "Flores Bajawa Premium",
    nameId: "Flores Bajawa Premium",
    tagline: "Smooth milk chocolate & sweet hazelnut",
    taglineId: "Cokelat susu lembut & hazelnut manis",
    price: 130000,
    roastLevel: "Medium",
    roastLevelId: "Medium",
    altitude: "1,300 - 1,550m",
    process: "Full Washed",
    processId: "Full Washed (Cuci Penuh)",
    variety: "Catimor & Typica",
    tastingNotes: ["Milk Chocolate", "Hazelnut", "Caramel", "Vanilla"],
    tastingNotesId: ["Cokelat Susu", "Hazelnut", "Karamel", "Vanila"],
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    description: "Sourced from the fertile volcanic soils of the Bajawa Highlands. This specialty-grade bean offers comforting dessert notes, thick buttery body, and very clean structure.",
    descriptionId: "Bersumber dari tanah vulkanis subur di Dataran Tinggi Bajawa. Biji kopi specialty-grade ini menawarkan rasa hidangan penutup yang menenangkan, bodi mentega yang tebal, dan struktur rasa yang sangat bersih.",
    rating: 4.7
  },
  {
    id: "java",
    name: "Java Preanger Classic",
    nameId: "Java Preanger Klasik",
    tagline: "Historical heritage with aromatic jasmine sweetness",
    taglineId: "Warisan sejarah dengan kemanisan melati aromatik",
    price: 140000,
    roastLevel: "Light-Medium",
    roastLevelId: "Light-Medium",
    altitude: "1,400 - 1,700m",
    process: "Natural Process",
    processId: "Proses Natural",
    variety: "Andungsari & Sigararutang",
    tastingNotes: ["Jasmine", "Black Tea", "Peach", "Honey Syrup"],
    tastingNotesId: ["Melati", "Teh Hitam", "Persik", "Sirup Madu"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600",
    description: "The classic 'A Java' heritage coffee, grown on the mist-shrouded volcanic ridges of West Java. The natural process highlights complex floral tea elegance and sweet stonefruit.",
    descriptionId: "Kopi warisan klasik 'A Java', ditanam di pegunungan vulkanis berselimut kabut di Jawa Barat. Proses natural menonjolkan keanggunan teh bunga yang kompleks dan buah batu manis.",
    rating: 4.9
  }
];

// Initial preloaded orders for tracking demo
const initialOrders: Order[] = [
  {
    id: "BKN-GAYO-101",
    date: "2026-05-24",
    items: [
      {
        product: mockProducts[0],
        quantity: 2,
        grindSize: "Whole Bean"
      }
    ],
    total: 270000,
    shippingName: "Budi Santoso",
    shippingAddress: "Jl. Sudirman No. 12, Jakarta Pusat, DKI Jakarta",
    courier: "JNE Express",
    paymentMethod: "QRIS",
    status: "shipped",
    trackingLogs: [
      { time: "09:00 AM", message: "Order payment verified successfully via QRIS.", messageId: "Pembayaran pesanan berhasil diverifikasi melalui QRIS." },
      { time: "11:30 AM", message: "Micro-roasting process initiated. Master Roaster target profile reached.", messageId: "Proses penyangraian mikro dimulai. Profil target Master Roaster tercapai." },
      { time: "03:15 PM", message: "Biji Kopi packed in hermetic nitrogen-flushed premium bags with degassing valves.", messageId: "Biji Kopi dikemas dalam kantong premium kedap udara katup degassing." },
      { time: "05:00 PM", message: "Package picked up by courier (JNE Express) and departed from Jakarta Warehouse.", messageId: "Paket diambil oleh kurir (JNE Express) dan berangkat dari Gudang Jakarta." }
    ]
  },
  {
    id: "BKN-KINTA-202",
    date: "2026-05-25",
    items: [
      {
        product: mockProducts[2],
        quantity: 1,
        grindSize: "V60"
      }
    ],
    total: 150000,
    shippingName: "Eliza Smith",
    shippingAddress: "Canggu Heights Villa 4B, Kuta Utara, Bali",
    courier: "DHL Express",
    paymentMethod: "Virtual Account",
    status: "roasting",
    trackingLogs: [
      { time: "08:15 AM", message: "Order payment verified via BCA Virtual Account.", messageId: "Pembayaran pesanan diverifikasi melalui BCA Virtual Account." },
      { time: "10:30 AM", message: "Specialty honey beans selected and batch roasting sequence initiated.", messageId: "Biji kopi honey pilihan diseleksi dan urutan penyangraian batch dimulai." }
    ]
  }
];

interface AppContextProps {
  language: "en" | "id";
  setLanguage: (lang: "en" | "id") => void;
  t: (key: keyof typeof translationDictionary.en) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  cart: CartItem[];
  addToCart: (product: Product, grindSize: string, quantity: number) => void;
  removeFromCart: (productId: string, grindSize: string) => void;
  updateQuantity: (productId: string, grindSize: string, quantity: number) => void;
  clearCart: () => void;
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  orders: Order[];
  createOrder: (shippingName: string, shippingAddress: string, courier: string, paymentMethod: string) => Order;
  trackOrder: (orderId: string) => Order | undefined;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<"en" | "id">("en");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  
  // Load initial cart and language from localStorage if client side
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        const savedLang = localStorage.getItem("bkn_lang") as "en" | "id";
        if (savedLang) setLanguageState(savedLang);

        const savedCart = localStorage.getItem("bkn_cart");
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {
            console.error("Error reading cart", e);
          }
        }

        const savedUser = localStorage.getItem("bkn_user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error("Error reading user", e);
          }
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLanguage = (lang: "en" | "id") => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("bkn_lang", lang);
    }
  };

  const t = (key: keyof typeof translationDictionary.en): string => {
    return translationDictionary[language][key] || translationDictionary["en"][key] || String(key);
  };

  const addToCart = (product: Product, grindSize: string, quantity: number) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(
      (item) => item.product.id === product.id && item.grindSize === grindSize
    );

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, grindSize, quantity });
    }

    setCart(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("bkn_cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId: string, grindSize: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.product.id === productId && item.grindSize === grindSize)
    );
    setCart(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("bkn_cart", JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = (productId: string, grindSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, grindSize);
      return;
    }
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId && item.grindSize === grindSize) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("bkn_cart", JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bkn_cart");
    }
  };

  const login = (name: string, email: string) => {
    const newUser = { name, email, isLoggedIn: true };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("bkn_user", JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bkn_user");
    }
  };

  const createOrder = (
    shippingName: string,
    shippingAddress: string,
    courier: string,
    paymentMethod: string
  ): Order => {
    // Math logic for subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.11);
    const total = subtotal + tax;

    const newOrder: Order = {
      id: `BKN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      items: [...cart],
      total,
      shippingName,
      shippingAddress,
      courier,
      paymentMethod,
      status: "ordered",
      trackingLogs: [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message: `Order initialized. Awaiting custom master roast batch alignment.`,
          messageId: `Pesanan diinisialisasi. Menunggu penyelarasan batch sangrai master khusus.`
        }
      ]
    };

    const newOrders = [newOrder, ...orders];
    setOrders(newOrders);
    clearCart();
    return newOrder;
  };

  const trackOrder = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id.toUpperCase() === orderId.toUpperCase());
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isCartOpen,
        setIsCartOpen,
        isLoginOpen,
        setIsLoginOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        user,
        login,
        logout,
        orders,
        createOrder,
        trackOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
