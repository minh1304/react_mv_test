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
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const limit = 9;

  const { isLoading, error, data, isFetching } = useQuery<Product[]>({
    queryKey: ['products', page], 
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
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">Image</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <td className="px-6 py-4 border-b border-gray-200">
                  <img src={product.images[0]} alt={product.title} className="h-20 w-20 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4 border-b border-gray-200">{product.title}</td>
                <td className="px-6 py-4 border-b border-gray-200">${product.price}</td>
                <td className="px-6 py-4 border-b border-gray-200">{product.category.name}</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {hoveredProductId === product.id && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  function handleEdit(productId: number) {
    console.log("Edit product with ID:", productId);
  }
}
export default DashboardComponent;
