import React, {useState} from 'react'
interface EditProps {
    product: {
      id: number;
      title: string;
      price: number;
      description: string;
    };
    onSave: (updatedProduct: { title: string; price: number; description: string }) => void;
    onCancel: () => void;
  }
  const EditComponent: React.FC<EditProps> = ({ product, onSave, onCancel }) => {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
  
    const handleSave = () => {
      onSave({ title, price, description });
    };
  
    return (
      <div className="p-4 bg-white shadow rounded border max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2 font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-60 w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-400 text-white">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    );
  };

export default EditComponent
