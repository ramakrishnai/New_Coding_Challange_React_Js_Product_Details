import React, { useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    description: '',
    canExpire: false,
    expiryDate: '',
    category: '',
    price: 0,
    onSpecial: false
  });
  const [editIndex, setEditIndex] = useState(-1); // Index of the product being edited
  const [filterCategory, setFilterCategory] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNewProduct({ ...newProduct, [name]: inputValue });
  };

  const handleAddProduct = () => {
    if (editIndex === -1) {
      setProducts([...products, newProduct]);
    } else {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(-1);
    }
    setNewProduct({
      description: '',
      canExpire: false,
      expiryDate: '',
      category: '',
      price: 0,
      onSpecial: false
    });
  };

  const handleEditClick = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const filteredProducts = filterCategory
    ? products.filter((product) => product.category === filterCategory)
    : products;

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Product List</h1>
      <div className="row mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Filter by Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="canExpire" checked={newProduct.canExpire} onChange={handleInputChange} />
            <label className="form-check-label">Can Expire</label>
          </div>
          {newProduct.canExpire && (
            <input type="date" className="form-control mt-2" name="expiryDate" value={newProduct.expiryDate} onChange={handleInputChange} />
          )}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" name="onSpecial" checked={newProduct.onSpecial} onChange={handleInputChange} />
            <label className="form-check-label">On Special</label>
          </div>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={handleAddProduct}>{editIndex === -1 ? 'Add Product' : 'Update Product'}</button>
        </div>
      </div>
      <ul className="list-group">
        {filteredProducts.map((product, index) => (
          <li key={index} className={`list-group-item ${product.onSpecial ? 'bg-warning' : ''}`}>
            <div><strong>Description:</strong> {product.description}</div>
            <div>{product.canExpire ? <><strong>Expiry Date:</strong> {product.expiryDate}</> : 'Does not expire'}</div>
            <div><strong>Category:</strong> {product.category}</div>
            <div><strong>Price:</strong> {product.price}</div>
            <div><strong>On Special:</strong> {product.onSpecial ? 'Yes' : 'No'}</div>
            <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditClick(index)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
