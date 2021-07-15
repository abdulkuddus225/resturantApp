import { orders } from "../../MockData/mockdata.js";
import { listTables } from "./table.js";
import { calculateTotal } from "./calculatetotal.js";

export function generateBill(num) {

    let count = 0;
    let totalItemPrice = 0;
    let tablehiddenID = document.getElementById('hiddenID');
    tablehiddenID.setAttribute("value", num);
    let generateBill = document.getElementById('generateBill');
    let allOrders = document.createElement('tbody');
    orders.forEach(order => {
        let tr = document.createElement('tr');
        if (order.table_no == num) {
            count += 1;
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let qty = document.createElement('input');
            qty.type = "number";
            qty.style.width = "80px";
            qty.style.height = "20px";
            qty.setAttribute("value", order.item_qty);
            qty.setAttribute("min", 1);
            qty.onchange = function () {
                qty.setAttribute("value", qty.value);
                order.item_qty = qty.value;
                totalItemPrice = calculateTotal(num);
                let totalSum = document.getElementById('totalSum');
                totalSum.innerText = "Total: " + totalItemPrice;
                listTables()
            };
            let td5 = document.createElement('td');
            let btn = document.createElement('button');
            btn.innerText = "Delete";
            btn.setAttribute("id", count);
            btn.addEventListener("click", function () { deleteItem(num, order.item_id) });
            td5.appendChild(btn);
            td1.innerText = count;
            td2.innerText = order.item_name;
            td3.innerText = order.item_price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            td4.appendChild(qty);
            tr.appendChild(td4);
            tr.appendChild(td5);
        }
        allOrders.appendChild(tr);
    })

    for (const iterator of generateBill.children) {
        iterator.remove();
    }
    generateBill.appendChild(allOrders);

    totalItemPrice = calculateTotal(num);
    let totalSum = document.getElementById('totalSum');
    totalSum.innerText = "Total: " + totalItemPrice;
    listTables();
}


function deleteItem(tableNo, itemNo) {
    const index = orders.findIndex((g) => g.item_id == itemNo && g.table_no == tableNo);
    if (index != -1) {
        orders.splice(index, 1);
        listTables();
        generateBill(tableNo);
    }

}