import React from 'react';
import Piechart from '../components/PieChart';

export default function Landing() {
    const arr = [
        { food: 20, others: 10, medical: 20, transport: 5, drinks: 15 },

    ];

    return (
        <>
            {arr.map((ob, index) => (
                <Piechart
                    key={index}
                    food={ob.food}
                    others={ob.others}
                    drinks={ob.drinks}
                    transport={ob.transport}
                    medical={ob.medical}
                />
            ))}
        </>
    );
}