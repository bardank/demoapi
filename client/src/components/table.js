import React from 'react';

const Table = ({data}) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">SN.</th>
                        <th scope="col">Contract No.</th>
                        <th scope="col">Stock Symbol</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Seller</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rate amount</th>
                    </tr>
                </thead>
                <tbody>
                    {data.floorsheets.content && data.floorsheets.content.map((item, i)=>(
                        <tr key={i}>
                            <th scope="row">{Number(i)+1}</th>
                            <td>{item.contractId}</td>
                            <td>{item.stockSymbol}</td>
                            <td>{item.buyerMemberId}</td>
                            <td>{item.sellerMemberId}</td>
                            <td>{item.contractQuantity}</td>
                            <td>{item.contractRate}</td>
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}

export default Table;
