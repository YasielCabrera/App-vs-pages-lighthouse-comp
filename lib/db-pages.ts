// this is the same as db.ts but for pages-router without the server-only import

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  availableAt: string;
  status: string;
  imageUrl: string;
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: unknown[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  // Simulate a delay to make the loading state more obvious
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allProducts = Array.from({ length: 100 }).map((_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: (((index + 1) * 10) % 1000) + 1,
    stock: (index * 7) % 100,
    availableAt: new Date(
      Date.now() + index * 24 * 60 * 60 * 1000
    ).toISOString(),
    status: ['in stock', 'low stock', 'out of stock'][index % 3],
    imageUrl: `https://picsum.photos/seed/${index + 1}/200/200`
  }));

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(offset, offset + 10);
  const newOffset = offset + 10 < filteredProducts.length ? offset + 10 : null;

  return {
    products: paginatedProducts,
    newOffset: newOffset,
    totalProducts: filteredProducts.length
  };
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
}

export async function getCustomers(): Promise<{
  customers: Customer[];
}> {
  // Simulate a delay to make the loading state more obvious
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    customers: Array.from({ length: 100 }).map((_, index) => ({
      id: index,
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@example.com`,
      phone: `+123456789${index}`,
      orders: index
    }))
  };
}
