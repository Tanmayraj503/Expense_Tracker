import React from "react";
import PieChart from "../components/piechart";

export default function Landing() {
    const obje = [
        { food: 20, others: 10, medical: 20, transport: 5, drinks: 15 },
        { food: 30, others: 5, medical: 15, transport: 10, drinks: 20 },
    ];

    return (
        <>
            {obje.map((ob, index) => (
                <PieChart
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