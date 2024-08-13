import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Favatie = () => {
    const auth = useSelector((state) => state.auth.currentUser);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/wishListProduct  /${auth._id}`);
                setWishlist(response.data.user.wishList);
            } catch (error) {
                console.error('There was an error fetching the wishlist!', error);
            }
        };

        if (auth) {
            fetchWishlist();
        }
    }, [auth]);

    if (!auth) {
        return (
            <div style={{ marginTop: "200px" }}>
                <p>Please log in to see your wishlist.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: "200px" }}>
            <h2>Your Wishlist</h2>
            <div>
                {wishlist.length > 0 ? (
                    wishlist.map(product => (
                        <div key={product._id} className="wishlist-item">
                            <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>{product.price} VNĐ</p>
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Favatie;
