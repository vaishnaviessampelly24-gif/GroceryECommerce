const API_URL = "http://localhost:3000";

async function loadProducts() {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();

    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="images/${p.image}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p><b>₹${p.price}</b></p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

async function loadCart() {
    const res = await fetch(`${API_URL}/cart`);
    const cart = await res.json();

    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("total-price");
    list.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">X</button>`;
        list.appendChild(li);
    });

    totalEl.innerText = `Total: ₹${total}`;
}

async function addToCart(id) {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    const product = products.find(p => p.id === id);

    await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    loadCart();
}

async function removeFromCart(id) {
    await fetch(`${API_URL}/cart/${id}`, { method: "DELETE" });
    loadCart();
}

loadProducts();
loadCart();