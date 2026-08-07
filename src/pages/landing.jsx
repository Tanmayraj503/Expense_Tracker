import React from 'react';
import Piechart from '../components/PieChart';

export default function Landing() {
    const arr = [
        { food: 20, others: 10, medical: 20, transport: 5, drinks: 15, housing: 16, utilities: 21, shopping: 67, entertainment: 35 },

    ];

    return (
        <>
            {arr.map((ob, index) => (
                <Piechart
                    key={index}
                    Food={ob.food}
                    Others={ob.others}
                    Drinks={ob.drinks}
                    Transport={ob.transport}
                    Health={ob.medical}
                    Housing={ob.housing}
                    Utilities={ob.utilities}
                    Shopping={ob.shopping}
                    Entertainment={ob.entertainment}
                />
            ))}
        </>
    );
}