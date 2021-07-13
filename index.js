menu = [
    {
        "item_id": 1,
        "item_name": "Crusty Garlic Focaccia with Melted Cheese",
        "item_price": 105.00,
        "course_type": "appetizers"
    },

    {
        "item_id": 2,
        "item_name": "French Fries",
        "item_price": 110.00,
        "course_type": "entree"
    },

    {
        "item_id": 3,
        "item_name": "Home Country Fries with Herbs",
        "item_price": 115.00,
        "course_type": "entree"
    },

    {
        "item_id": 4,
        "item_name": "French Fries with Cheese",
        "item_price": 120.00,
        "course_type": "entree"
    },
    {
        "item_id": 5,
        "item_name": "Pizza",
        "item_price": 200,
        "course_type": "appetizers"
    },
    {
        "item_id": 6,
        "item_name": "Burger",
        "item_price": 120.00,
        "course_type": "appetizers"
    },
    {
        "item_id": 7,
        "item_name": "Soda",
        "item_price": 120.00,
        "course_type": "beverages"
    },
    {
        "item_id": 8,
        "item_name": "Chicken Curry",
        "item_price": 220.00,
        "course_type": " main course"
    },
]


table = [
    {
        "table_no": 1,
        "table_total": 0.0,
        "items_total": 0,
    },
    {
        "table_no": 2,
        "table_total": 0.0,
        "items_total": 0,
    },
    {
        "table_no": 3,
        "table_total": 0.0,
        "items_total": 0,
    }
];

orders = [];
function listMenu() {

    const menuDisplay = document.getElementById('menuItems');
    const search = document.getElementById('searchMenuText').value;
    console.log(search)


    const div = document.createElement('div');
    div.setAttribute("id", "listMenuItems")
    menu.forEach(element => {
        const innerDiv = document.createElement('div');
        innerDiv.setAttribute("id", element.item_id);
        innerDiv.setAttribute("draggable", true);
        innerDiv.setAttribute("ondragstart", "dragstart_handler(event);");
        innerDiv.style.minHeight ="100px";
        innerDiv.style.marginTop = "10px";
        innerDiv.style.border = "1px solid";
        innerDiv.style.padding = "10px";
        innerDiv.style.boxShadow = "5px 10px #888888";
        const itemName = document.createElement('h3');
        const itemPrice = document.createElement('p');
        const course = document.createElement('p');
        course.innerText = element.course_type;
        course.setAttribute("id", "courseType");
        course.style.display = "none";
        itemName.innerText = element.item_name;
        itemPrice.innerText = "Price: " + element.item_price;
        innerDiv.appendChild(itemName);
        innerDiv.appendChild(itemPrice);
        innerDiv.appendChild(course)
        div.appendChild(innerDiv);
    });
    menuDisplay.appendChild(div);
}


function listTables() {
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
        innerDiv.setAttribute("ondrop", "drop_handler(event);");
        innerDiv.setAttribute("ondragover", "dragover_handler(event);");
        innerDiv.addEventListener("click", function () { generateBill(element.table_no) });
        innerDiv.style.minHeight ="100px";
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
        orders.forEach(order => {
            if (order.table_no == element.table_no) {
                totalItemPrice += order.item_price;
                totalItemCount += 1;
                tableTotal.innerText = "Total amount: " + totalItemPrice * order.item_qty;
                itemsTotal.innerText = "Total items: " + totalItemCount;
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



// Dragging

function dragstart_handler(ev) {
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
}



function dragover_handler(ev) {
    ev.preventDefault();
}



function drop_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.clearData();
    // Get the data, which is the id of the drop targetge
    var tableNumber = parseInt(ev.currentTarget.id);
    var itemId = ev.dataTransfer.getData("text");
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
                order.item_qty = prevQty+1;
                flag = false;
            }
        }
    })
    
    if(flag){
        orders.push(addOrder);
    }
    

    listTables();

}

function generateBill(num) {

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
            qty.onchange = function(){
                qty.setAttribute("value", qty.value);
                order.item_qty = qty.value;
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
    orders.forEach(order => {
        if (order.table_no == num) {
            totalItemPrice += order.item_price * order.item_qty;
        }
    })

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

function searchMenu() {

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchMenuText');
    filter = input.value.toUpperCase();
    OuterDiv = document.getElementById("listMenuItems");
    innderDiv = OuterDiv.getElementsByTagName('div');
    for (let i = 0; i < innderDiv.length; i++) {
        a = innderDiv[i].getElementsByTagName("h3")[0];
        let course = document.getElementById('courseType');
        txtValue = a.innerText || a.textContent;
        let courseType =  course.innerText
        courseType = courseType.toUpperCase();
        if (txtValue.toUpperCase().indexOf(filter) > -1 || courseType == filter) {
            innderDiv[i].style.display = "block";
        }
        else {
            innderDiv[i].style.display = "none";
        }
    }

}

function searchTables() {

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchItemText');
    filter = input.value.toUpperCase();
    OuterDiv = document.getElementById("listTableItems");
    innderDiv = OuterDiv.getElementsByTagName('div');

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
}


const closeSession = document.getElementById('closeSession');
closeSession.addEventListener("click", closeSessionfunc);

function closeSessionfunc(){
    let hiddenID = document.getElementById('hiddenID').value;
    console.log(hiddenID)
    orders.forEach((order,index) => {
        if(order.table_no == hiddenID){
            orders.splice(index);
        }
    })
    listTables();
}