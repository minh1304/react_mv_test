import { createLazyFileRoute } from '@tanstack/react-router';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export const Route = createLazyFileRoute('/dashboard/')({
    component: DashboardComponent,
});

function DashboardComponent() {
  const [page, setPage] = useState(0);
  const limit = 9;

  const { isLoading, error, data, isFetching } = useQuery<Product[]>({
    queryKey: ['products', page], // Include page in queryKey for caching per page
    queryFn: () =>
      fetch(`https://api.escuelajs.co/api/v1/products?offset=${page * limit}&limit=${limit}`).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }),
      placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error instanceof Error ? error.message : 'An error occurred'}</p>;

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome to the Dashboard!</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((product) => (
          <li key={product.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            {product.images[0] && (
              <img src={product.images[0]} alt={product.title} className="h-50 object-cover rounded-md mb-4" />
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0 || isFetching}
          className={`px-4 py-2 rounded bg-blue-500 text-white ${page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page: {page + 1}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isFetching || (data && data.length < limit)}
          className={`px-4 py-2 rounded bg-blue-500 text-white ${isFetching || (data && data.length < limit) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
      {isFetching && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
export default DashboardComponent;
