import { table } from "../../MockData/mockdata.js";
import { calculateTotal } from "./calculatetotal.js";
import { orders } from "../../MockData/mockdata.js";
import { generateBill } from "./billgenerate.js";
import { dragover_handler } from "../../js/handler.js";
import { drop_handler } from "../../js/handler.js";



export function listTables() {
    const tableDisplay = document.getElementById('tablesAvailable');
    const div = document.createElement('div');
    div.setAttribute("id", "listTableItems");
    table.forEach(element => {
        let totalItemPrice = 0;
        let totalItemCount = 0;
        const innerDiv = document.createElement('div');
        innerDiv.setAttribute("data-bs-toggle", "modal");
        innerDiv.setAttribute("data-bs-target", "#exampleModal");
        innerDiv.setAttribute("id", element.table_no);
        innerDiv.setAttribute("draggable", true);
        innerDiv.ondrop = drop_handler;
        innerDiv.ondragover = dragover_handler;
        innerDiv.addEventListener("click", function () { generateBill(element.table_no) });
        innerDiv.style.minHeight = "100px";
        innerDiv.style.marginTop = "10px";
        innerDiv.style.border = "1px solid";
        innerDiv.style.padding = "10px";
        innerDiv.style.boxShadow = "5px 10px #888888";
        const tableTotal = document.createElement('p');
        tableTotal.innerText = "Total amount: ";
        const itemsTotal = document.createElement('p');
        itemsTotal.innerText = "Total items: ";
        const tableNumber = document.createElement('h3');
        tableNumber.innerText = "Table Number: " + element.table_no;
        totalItemPrice = calculateTotal(element.table_no);
        orders.forEach(order => {
            if (order.table_no == element.table_no) {
                totalItemCount += 1;
                if (totalItemCount == 1) {
                    tableTotal.innerText = "Total amount: " + totalItemPrice;
                    itemsTotal.innerText = "Total items: " + totalItemCount;
                }
                else {
                    tableTotal.innerText = "Total amount: " + totalItemPrice;
                    itemsTotal.innerText = "Total items: " + totalItemCount;
                }

            }
        })
        innerDiv.appendChild(tableNumber)
        innerDiv.appendChild(tableTotal);
        innerDiv.appendChild(itemsTotal);
        div.appendChild(innerDiv);
    });
    for (const iterator of tableDisplay.children) {
        iterator.remove();
    }
    tableDisplay.appendChild(div);
}


searchItemText.addEventListener('keyup', (e) => {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchItemText');
    filter = input.value.toUpperCase();
    let OuterDiv = document.getElementById("listTableItems");
    let innderDiv = OuterDiv.getElementsByTagName('div');

    for (let i = 0; i < innderDiv.length; i++) {
        a = innderDiv[i].getElementsByTagName("h3")[0];
        txtValue = a.innerText || a.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            innderDiv[i].style.display = "block";
        }
        else {
            innderDiv[i].style.display = "none";

        }
    }

})
