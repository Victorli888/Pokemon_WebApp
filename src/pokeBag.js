import React, { useState, useEffect } from 'react';
import './pokeBag.css';

const PokeBag = () => {
    const [pokeBag, setPokeBag] = useState([
        { name: "Potion", type: "healing", quantity: 5 },
        { name: "Super Potion", type: "healing", quantity: 3 },
        { name: "Poké Ball", type: "capture", quantity: 10 }
    ]);

    // const useItem = (itemName) => {
    //     const updatedBag = [...pokeBag];
    //     const itemIndex = updatedBag.findIndex(item => item.name === itemName);
    //
    //     if (itemIndex !== -1 && updatedBag[itemIndex].quantity > 0) {
    //         // Implement the effects of the item, such as healing or capturing
    //         // ... Perform healing logic ...
    //
    //         updatedBag[itemIndex].quantity -= 1;
    //         setPokeBag(updatedBag);
    //     }
    // };

    return (
        <div id="poke-bag">
            <h3>Poké Bag:</h3>
            <ul>
                {pokeBag.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.quantity} in Bag
                        {/*<button onClick={() => useItem(item.name)}>Use</button>*/}
                        <button>Use</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokeBag;
