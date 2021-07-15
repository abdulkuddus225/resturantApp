import { orders } from "../../MockData/mockdata.js";
export function calculateTotal(table) {

    let tableSum = 0;
    orders.forEach(order => {
        if (order.table_no == table) {
            tableSum += order.item_price * order.item_qty;
        }
    })
    return tableSum;
}