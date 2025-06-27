import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Unavbar from './Unavbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const rawUser = localStorage.getItem('user');
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    if (!user || !user.id) {
      setError("User not logged in or missing ID");
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/item`, { params: { userId: user.id } })
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Invalid response, expected an array but got:", typeof response.data);
          setItems([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch items.");
        setLoading(false);
        console.error(err);
      });

    axios
      .get(`${BASE_URL}/wishlist/${user.id}`)
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error("Failed to fetch wishlist:", err));
  }, []);

  const isItemInWishlist = (itemId) => wishlist.some((item) => item.itemId === itemId);

  const addToWishlist = async (itemId) => {
    try {
      const selectedItem = items.find((item) => item._id === itemId);
      if (!selectedItem) return;

      const { title, itemImage } = selectedItem;
      await axios.post(`${BASE_URL}/wishlist/add`, {
        itemId,
        title,
        itemImage,
        userId: user.id,
        userName: user.name,
      });

      const res = await axios.get(`${BASE_URL}/wishlist/${user.id}`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.post(`${BASE_URL}/wishlist/remove`, { itemId });
      const res = await axios.get(`${BASE_URL}/wishlist/${user.id}`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div>
      <Unavbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Books List</h2>

        {loading && <p className="text-center">Loading books...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          <div className="row">
            {items.map((item) => (
              <div key={item._id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  {item.itemImage && (
                    <img
                      src={`${BASE_URL}/${item.itemImage.replace(/\\/g, '/')}`}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Author: {item.author}</p>
                    <p className="card-text">Genre: {item.genre}</p>
                    <p className="card-text fw-bold text-success">₹ {item.price}</p>

                    {user && (
                      <Button
                        variant={isItemInWishlist(item._id) ? 'danger' : 'primary'}
                        onClick={() =>
                          isItemInWishlist(item._id)
                            ? removeFromWishlist(item._id)
                            : addToWishlist(item._id)
                        }
                        className="me-2"
                      >
                        {isItemInWishlist(item._id)
                          ? 'Remove from Wishlist'
                          : 'Add to Wishlist'}
                      </Button>
                    )}

                    <Link
                      to={`/uitem/${item._id}`}
                      className="btn btn-secondary mt-2"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
