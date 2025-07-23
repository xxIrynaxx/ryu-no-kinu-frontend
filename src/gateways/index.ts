import { CartItem, Lang, Product, Theme } from '@/types';

export async function updateUserLang(lang: Lang, token: string) {
  const response = await fetch('ryu-no-kinu-back-production.up.railway.app/api/users/lang', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lang),
  });

  if (!response.ok) {
    throw new Error(`Помилка: ${response.status}`);
  }

  return await response.json();
}

export async function updateUserTheme(theme: Theme, token: string) {
  const response = await fetch('ryu-no-kinu-back-production.up.railway.app/api/users/theme', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(theme),
  });

  if (!response.ok) {
    throw new Error(`Помилка: ${response.status}`);
  }

  return await response.json();
}

export async function deleteUser(token: string) {
  const response = await fetch('ryu-no-kinu-back-production.up.railway.app/api/users/me', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Помилка при видаленні: ${response.status}`);
  }

  return true;
}

export async function updateUserProfile(formData: FormData, token: string) {
  const response = await fetch('ryu-no-kinu-back-production.up.railway.app/api/users/me', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchUserProfile(token: string) {
  const response = await fetch('ryu-no-kinu-back-production.up.railway.app/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  return response.json();
}

export const addToWishList = async (productId: string, token: string) => {
  const response = await fetch(
    `ryu-no-kinu-back-production.up.railway.app/api/wishlist/${productId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to add to wishlist');
  }

  return response.json();
};

export const addToCart = async (productId: string, size: string) => {
  const token = localStorage.getItem('token');

  if (token) {
    const res = await fetch(`ryu-no-kinu-back-production.up.railway.app/api/cart/${productId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, size, quantity: 1 }),
    });

    if (!res.ok) {
      console.error(`Error: ${res.statusText}`);
      throw new Error('Failed to add to cart');
    }
  }

  const currentCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingItem = currentCart.find(item => item.productId === productId && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    currentCart.push({ productId, size, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(currentCart));
};

export const removeFromWishlist = async (productId: string) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token');
  }

  const res = await fetch(`ryu-no-kinu-back-production.up.railway.app/api/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Error: ${res.statusText}`);
    throw new Error('Failed to remove from wishlist');
  }

  return res.json();
};

export const getWishlist = async (token: string): Promise<Product[]> => {
  const response = await fetch(`ryu-no-kinu-back-production.up.railway.app/api/wishlist`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch wishlist');

  return response.json();
};
