import { useState, useEffect } from 'react';
import './content.css';

interface ContentProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

function Content({ darkMode, toggleDarkMode }: ContentProps) {
    type FavState = { [key: string]: boolean; };
    type CartItem = { [key: string]: number; };
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showFavorites, setShowFavorites] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [count, setCount] = useState<CartItem>({});
    const [fav, setFav] = useState<FavState>({});
    const [data, setData] = useState([]);    
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                const favState: FavState = {};
                data.forEach((item: any) => {
                    favState[item.id] = false;
                });
                setData(data);
                setFav(favState);
            });
    }, []);
    
    const switchFavState = (id: string) => {
        setFav(fav => ({ ...fav, [id]: !fav[id] }));
    };

    const increaseCount = (id: string) => {
        setCount(item => ({ ...item, [id]: (item[id] || 0) + 1 }));
    };

    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      setShowFavorites(false);
      setShowOffers(false);
  };

  const handleShowFavorites = () => {
      setShowFavorites(true);
      setSelectedCategory('all');
      setShowOffers(false);
  };

  const handleShowOffers = () => {
      setShowOffers(true);
      setSelectedCategory('all');
      setShowFavorites(false);
  };


    const decreaseCount = (id: string) => {
        setCount(item => {
            const newCount = { ...item, [id]: (item[id] || 1) - 1 };
            if (newCount[id] <= 0) {
                delete newCount[id];
            }
            return newCount;
        });
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const filteredData = showFavorites
        ? data.filter(item => fav[item.id])
        : showOffers
            ? data.filter(item => item.price < 50)
            : (selectedCategory === 'all'
                ? data
                : data.filter(item => item.category === selectedCategory));

    const cartItems = Object.keys(count).filter(id => count[id] > 0).map(id => {
        const item = data.find((item: any) => item.id === parseInt(id));
        return item ? (
            <div key={item.id} className="cart-item">
                <div className="cart-item-title" > {item.title} </div>
                <div className="cart-item-controls" >
                    <span>{ count[item.id] } x </span>
                    <div className="cart-item-price" > {item.price} lei </div>
                    <button onClick={() => increaseCount(item.id)}> + </button>
                    <button onClick={() => decreaseCount(item.id)}> - </button>
                </div>
            </div>
        ) : null;
    });

    const totalAmount = Object.keys(count).reduce((sum, id) => {
        const item = data.find((item: any) => item.id === parseInt(id));
        return sum + (item ? item.price * count[id] : 0);
    }, 0).toFixed(2);

    return (
        <div>
            <div className='navbar'>
 
                <div className="dropdown navbar_elem ">
                    <a className="drop-btn">Produse</a>
                    <div className="dropdown-content">
                        <a onClick={() => handleCategoryChange('all')}>All</a>
                        <a onClick={() => handleCategoryChange("men's clothing")}>Men's Clothing</a>
                        <a onClick={() => handleCategoryChange("women's clothing")}>Women's Clothing</a>
                        <a onClick={() => handleCategoryChange('jewelery')}>Jewelery</a>
                        <a onClick={() => handleCategoryChange('electronics')}>Electronics</a>
                    </div>
                </div>

                <div className="navbar_elem ">
                  <a onClick={handleShowOffers}>Oferte</a>
                </div>
                
                <div className="navbar_elem">
                <a onClick={handleShowFavorites}>Favorite</a>
                </div>

                <div className="navbar_elem ">
                  <a>Help me</a>
                </div>

                <div className="navbar_elem dropdown">
                    <a className="dropbtn" onClick={toggleCart}>Cosul meu</a>
                    {isCartOpen && (
                        <div className="dropdown-content">
                            {cartItems.length > 0 ? cartItems : <div>Cart is empty</div>}
                            <div>Total: {totalAmount} lei</div>
                        </div>
                    )}
                </div>
                
            </div>

            <div className="switch-color">
                  <button onClick={toggleDarkMode}>
                  </button>
              </div>

            <div className='products-window'>
                <ul className='products'>
                    {filteredData.map(item => (
                        <li key={item.id} className='ls-pr'>
                            <div className='product'>

                                <div className='product-img'>
                                    <button className={fav[item.id] ? 'product-img-bton' : 'product-img-btoff'}
                                        onClick={() => switchFavState(item.id)}>
                                    </button>
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className='product-text'>
                                    <h1>{item.title}</h1>
                                    <a>Pana la 12 rate cu MyWallet</a>
                                    <div className='product-cst-btn'>
                                      <h1>rat: {item.rating.rate}</h1>
                                      <h1>{item.price} lei</h1>
                                      <button className='product-cst-btn-img' onClick={() => increaseCount(item.id)}></button>
                                    </div> 
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default Content;
