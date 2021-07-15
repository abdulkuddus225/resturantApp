import { menu } from "../../MockData/mockdata.js";
import { dragstart_handler } from "../../js/handler.js";



export function listMenu() {

    const menuDisplay = document.getElementById('menuItems');
    const search = document.getElementById('searchMenuText').value;
    const div = document.createElement('div');
    div.setAttribute("id", "listMenuItems")
    menu.forEach(element => {
        const innerDiv = document.createElement('div');
        innerDiv.setAttribute("id", element.item_id);
        innerDiv.setAttribute("draggable", true);
        innerDiv.ondragstart = dragstart_handler;
        innerDiv.style.minHeight = "100px";
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
searchMenuText.addEventListener('keyup', (e) => {
    const target = e.target.value.toUpperCase();
    const filteredItems = menu.filter(items => {
        return items.item_name.toUpperCase().includes(target) || items.course_type.toUpperCase().includes(target) || items.item_price == (target);
    });
    displayItems(filteredItems)
})

const displayItems = (items) => {
    const menuItemsList = document.getElementById('listMenuItems');
    const htmlString = items
        .map((item) => {
            return `<div id="${item.item_id}" draggable="true" ondragstart="dragstart_handler(event);" 
        style="min-height:100px; margin-top:10px; border:1px solid; padding: 10px; box-shadow: rgb(136, 136, 136) 5px 10px;">
        <h3>${item.item_name}</h3>
        <p>Price: ${item.item_price}</p>
        <p id="courseType" style="display: none;">${item.course_type}</p>
        </div>`;
        })
        .join(" ");
    menuItemsList.innerHTML = htmlString;
}