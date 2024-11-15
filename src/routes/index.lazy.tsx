import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'


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
export const Route = createLazyFileRoute('/')({
  component: Index,
})
// GET all Products 

function Index() {
  const { isLoading, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://api.escuelajs.co/api/v1/products').then((res) => res.json()),
  });


  if(isLoading) return <p className='text-center text-lg'>Loading ... </p>
  if(error) return <p className='text-center text-red-500'>An error am occurred: {error.message}</p>

  return (
    <div className="bg-grey-100 min-h-screen py-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Product List</h1>
        <div className="grid gap-6 mx-auto max-w-5xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {data?.map((product : Product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-48 w-full object-contain mb-4 rounded"
              />
              <h2 className='text-lg font-semibold text-gray-800 truncate'>{product.title}</h2>
              <p className='text-gray-600 text-sm mt-1 truncate'>{product.category.name}</p>
              <p className='text-gray-800 font-semibold mt-2'>${product.price}</p>
            </div>
          ))}
        </div>
    </div>
  );
}