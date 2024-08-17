import React from 'react';
import {stockService} from '../services/StockService';
import {Stock} from "../model/Stock";
import '../css/StockTransactions.css';

const StockTransactions: React.FC = () => {
    const [stocks, setStocks] = React.useState<Stock[]>([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        stockService.getTransactions()
            .then((response: any) => {
                setStocks(response.data);
            })
            .catch((error: any) => {
                console.error('There was an error retrieving the report!', error);
            });
    };

    const handleDelete = (id: number) => {
        stockService.deleteStock(id)
            .then(() => {
                setStocks(stocks.filter(stock => stock.id !== id));
                window.location.reload();
            })
            .catch((error: any) => {
                console.error('There was an error deleting the stock!', error);
            });
    };

    const formatPercentage = (value: number | undefined) => {
        return value !== undefined ? `${value.toFixed(2)}%` : "N/A";
    };

    const getProfitLossClass = (value: number | undefined) => {
        if (value !== undefined) {
            return value >= 0 ? 'positive' : 'negative';
        }
        return '';
    };

    return (
        <div className="stock-transactions">
            <h2>Transactions table</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Purchase Date</th>
                    <th>Purchase Price</th>
                    <th>Quantity</th>
                    <th>Current Price</th>
                    <th>Profit/Loss</th>
                    <th>Percentage Change</th>
                    <th>Profit/Loss (7 Days)</th>
                    <th>Percentage Change (7 Days)</th>
                    <th>Profit/Loss (30 Days)</th>
                    <th>Percentage Change (30 Days)</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map(stock => (
                    <tr key={stock.id}>
                        <td>{stock.name}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.purchaseDate}</td>
                        <td>{stock.purchasePrice}</td>
                        <td>{stock.quantity}</td>
                        <td>{stock.currentPrice}</td>
                        <td className={getProfitLossClass(stock.profitOrLoss)}>
                            {stock.profitOrLoss?.toFixed(2)}
                        </td>
                        <td className={getProfitLossClass(stock.percentageChange)}>
                            {formatPercentage(stock.percentageChange)}
                        </td>
                        <td className={getProfitLossClass(stock.profitOrLoss7Days)}>
                            {stock.profitOrLoss7Days?.toFixed(2)}
                        </td>
                        <td className={getProfitLossClass(stock.percentageChange7Days)}>
                            {formatPercentage(stock.percentageChange7Days)}
                        </td>
                        <td className={getProfitLossClass(stock.profitOrLoss30Days)}>
                            {stock.profitOrLoss30Days?.toFixed(2)}
                        </td>
                        <td className={getProfitLossClass(stock.percentageChange30Days)}>
                            {formatPercentage(stock.percentageChange30Days)}
                        </td>
                        <td>
                            <button className="delete-button" onClick={() => handleDelete(stock.id!)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockTransactions;
