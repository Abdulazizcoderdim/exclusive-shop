// Narxlar uchun interfeys
interface Price {
  currentPrice: number;
  originalPrice: number;
}

// Reyting uchun interfeys
interface Ratings {
  value: number;
  count: number;
}

// Mahsulot uchun asosiy interfeys
export interface ProductType {
  _id: string;
  name: string;
  price: Price;
  ratings: Ratings;
  inStock: boolean;
  colors: string[];
  sizes: string[];
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
  category: string;
}

export type Inputs = {
  name: string;
  price: {
    currentPrice: number;
    originalPrice: number;
  };
  ratings: {
    value: number;
    count: number;
  };
  category: string;
  inStock: boolean;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
};

export type CartType = {
  cart: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
  }[];
};
export type WishListType = {
  wishList: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
  }[];
};

export interface LoginUserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export interface EditTypeUser {
  name?: string;
  password?: string;
  lastName?: string;
  email?: string;
  address?: string;
}

export interface EditUserRes {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  role: string;
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface BillingType {
  firstName: string;
  companyName: string;
  address: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
}
