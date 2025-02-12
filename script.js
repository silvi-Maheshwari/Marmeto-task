document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889")
        .then(response => response.json())
        .then(data => {
            let subtotal = 0;
            cartItemsContainer.innerHTML = "";
            data.items.forEach(item => {
                let itemSubtotal = (item.price * item.quantity) / 100;
                subtotal += itemSubtotal;
                cartItemsContainer.innerHTML += `
                    <tr class="itema" data-id="${item.id}"  >
                        <td class="hh"><img src="${item.image}" alt="${item.title}" width="50"> ${item.title}</td>
                        <td>₹${(item.price / 100).toFixed(2)}</td>
                        <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}"></td>
                        <td class="item-subtotal">₹${itemSubtotal.toFixed(2)}</td>
                        <td><button class="remove-btn" data-id="${item.id}">🗑️</button></td>
                    </tr>
                `;
            });
            updateTotal(subtotal);
        });

    function updateTotal(subtotal) {
        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        totalEl.textContent = `₹${subtotal.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const newQuantity = parseInt(event.target.value);
            const itemRow = event.target.closest("tr");
            const price = parseFloat(itemRow.children[1].textContent.replace("₹", ""));
            const newSubtotal = newQuantity * price;
            itemRow.querySelector(".item-subtotal").textContent = `₹${newSubtotal.toFixed(2)}`;
            
            let newTotal = 0;
            document.querySelectorAll(".item-subtotal").forEach(el => {
                newTotal += parseFloat(el.textContent.replace("₹", ""));
            });
            updateTotal(newTotal);
        }
    });

    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const itemRow = event.target.closest("tr");
            itemRow.remove();
            
            let newTotal = 0;
            document.querySelectorAll(".item-subtotal").forEach(el => {
                newTotal += parseFloat(el.textContent.replace("₹", ""));
            });
            updateTotal(newTotal);
        }
    });
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
