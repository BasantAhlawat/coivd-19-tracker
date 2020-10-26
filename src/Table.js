import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table({countries}) {
    return (
        <div>
            <div className="table__header"><th className="table__row">
                    <td className="data">Countries</td>
                    <td className="cases">Cases</td>
            </th></div>
            <div className="table">
                {countries.map((country) => (
                    <tr className="table__row">
                        <td className="table__data"><strong>{country.country}</strong></td>
                        <td>{numeral(country.cases).format("0,0")}</td>
                    </tr>
                ))}

            </div>
            
            
            
            
        </div>
    )
}

export default Table
