import { orders } from "../MockData/mockdata.js";
import { listTables } from "./util/table.js"; 
import { menu } from "../MockData/mockdata.js";

export function dragstart_handler(ev) {
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
}



export function dragover_handler(ev) {
    ev.preventDefault();
}



export function drop_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.clearData();
    // Get the data, which is the id of the drop targetge
    let tableNumber = parseInt(ev.currentTarget.id);
    let itemId = ev.dataTransfer.getData("text");
    const itemIndex = menu.findIndex(f => f.item_id == itemId);
    const item = menu[itemIndex];
    let flag = true;
    let qty = 1;
    const addOrder = {
        "table_no": tableNumber,
        "item_id": item.item_id,
        "item_name": item.item_name,
        "item_price": item.item_price,
        "item_qty": qty
    }
    orders.forEach(order => {
        if (orders.length > 0) {
            if (addOrder.item_id == order.item_id && addOrder.table_no == order.table_no) {
                let prevQty = order.item_qty;
                order.item_qty = prevQty + 1;
                flag = false;
            }
        }
    })

    if (flag) {
        orders.push(addOrder);
    }


    listTables();

}