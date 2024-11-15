import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import React, {useState} from 'react'
import type { FieldApi } from '@tanstack/react-form';
import axios from 'axios';


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}
interface EditProps {
    product: Product;
    onSave: (updatedProduct: { title: string; price: number; description: string; images: string[] }) => void;
    onCancel: () => void;
  }
  function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-red-500 text-sm">{field.state.meta.errors.join(", ")}</em>
            ) : null}
            {field.state.meta.isValidating ? <span className="text-blue-500">Validating...</span> : null}
        </>
    );
  }
  const EditComponent: React.FC<EditProps> = ({ product, onSave, onCancel }) => {
    const form = useForm<Product>({
      defaultValues: {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          images: product.images
      },
      onSubmit: ({ value }) => {
        const updatedProduct = {
          ...value,
          images: value.images.map((url) => url.trim()), 
        };
        console.log(value);
        mutation.mutate(updatedProduct);
      },
  });

      const mutation = useMutation({
        mutationFn: (updatedProduct: Product) => axios.put(
          `https://api.escuelajs.co/api/v1/productsssa/${product.id}`,
          {
            title: updatedProduct.title,
            price: updatedProduct.price,
            images: updatedProduct.images,
          }
        ),
        onSuccess: (response) => {

          window.alert("Success!!");
          location.reload();

        },
        onError: (error) => {
            window.alert(error.message);
        },

    })


    return (


      <div className="p-4 bg-white shadow rounded border max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className='space-y-4'
        >

          <div>
            <form.Field
              name="title"
              validators={{
                  onChange: ({ value }) =>
                      !value
                          ? 'Title is required'
                          : value.length < 3
                              ? 'User Name must be at least 3 characters'
                              : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                          value.includes('error') &&
                          'No "error" allowed in first name'
                      );
                  },
              }}
              children={(field) => (
                  <>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                          Title:
                      </label>
                      <input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FieldInfo field={field} />
                  </>
              )}
            />
          </div>
            

          <div>
              <form.Field
              name="price"
              validators={{
                onChange: ({ value }) =>
                  value <= 0 ? 'Price must be greater than 0' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    Price:
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <div>
            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Description is required' : value.length < 10 ? 'Description must be at least 10 characters' : undefined,
              }}
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    Description:
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 h-60"
                    rows={4}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />  
          </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-400 text-white">
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <button
                        type="submit"
                        disabled={!canSubmit}
                    >
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </button>
                )}
            />
          </button>
        </div> 
      </form>

      </div>

    );
  };

export default EditComponent
