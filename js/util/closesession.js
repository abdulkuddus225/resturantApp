import { orders } from "../../MockData/mockdata.js";
import { listTables } from "./table.js";


const closeSession = document.getElementById('closeSession');
closeSession.addEventListener("click", closeSessionfunc);

export function closeSessionfunc() {
    let hiddenID = document.getElementById('hiddenID').value;
    console.log(hiddenID)
    orders.forEach((order, index) => {
        if (order.table_no == hiddenID) {
            orders.splice(index, 1);
        }
    })
    listTables();
}