export type ActiveSection = 'profile' | 'orders' | 'settings';

export type WishListTab = 'wish' | 'viewed';

export type ActiveAdminTab =
  | 'profile'
  | 'user'
  | 'product'
  | 'discount'
  | 'category'
  | 'style'
  | 'type'
  | 'order'
  | 'settings';

export type Role = 'USER' | 'ADMIN';
export type Theme = 'DARK' | 'LIGHT';
export type Lang = 'ua' | 'en';

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatar: string;
  role: Role;
  theme: Theme;
  lang: Lang;
  wishlistProduct?: [];
  cartProduct?: [];
  cartPrice?: number;
  recentlyViewedProduct?: [];
};

type Type = {
  id: string;
  name: string;
  description?: string | null;
};

type Style = {
  id: string;
  name: string;
  description?: string | null;
};

export type Category = {
  id: string;
  name: string;
  type: Type;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  available: boolean;
  reviews: [
    {
      userId: string;
      rating: number;
      comment: string;
      createdAt: Date;
    },
  ];
  variants: [
    {
      size: string;
      color: string;
      stock: number;
    },
  ];
  photo: string[];
  createAt: Date;
  style: Style;
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

export type WishListItem = { productId: string };
