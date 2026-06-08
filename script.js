/* ==========================================
   AGUBESTCO E-COMMERCE JAVASCRIPT
========================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ==========================================
   DOM ELEMENTS
========================================== */

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

const searchInput = document.getElementById("searchInput");

const filters = document.querySelectorAll(".filter");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

/* ==========================================
   SAVE CART
========================================== */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ==========================================
   FORMAT NAIRA
========================================== */

function formatNaira(amount) {
  return "₦" + amount.toLocaleString();
}

/* ==========================================
   ADD TO CART
========================================== */

function addToCart(name, price) {

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name,
      price,
      qty: 1
    });
  }

  saveCart();
  updateCart();

  showToast(`${name} added to cart`);
}

/* ==========================================
   REMOVE ITEM
========================================== */

function removeItem(index) {

  cart.splice(index, 1);

  saveCart();

  updateCart();
}

/* ==========================================
   INCREASE QTY
========================================== */

function increaseQty(index) {

  cart[index].qty++;

  saveCart();

  updateCart();
}

/* ==========================================
   DECREASE QTY
========================================== */

function decreaseQty(index) {

  cart[index].qty--;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();

  updateCart();
}

/* ==========================================
   UPDATE CART UI
========================================== */

function updateCart() {

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p style="
      text-align:center;
      color:#ccc;
      margin-top:30px;">
      Your cart is empty
      </p>
    `;
  }

  cart.forEach((item, index) => {

    total += item.price * item.qty;

    count += item.qty;

    cartItems.innerHTML += `

    <div class="cart-item">

      <h4>${item.name}</h4>

      <p>${formatNaira(item.price)}</p>

      <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-top:10px;">

        <div>

          <button
          onclick="decreaseQty(${index})"
          style="
          padding:4px 10px;
          border:none;
          cursor:pointer;">
          -
          </button>

          <span style="margin:0 10px;">
          ${item.qty}
          </span>

          <button
          onclick="increaseQty(${index})"
          style="
          padding:4px 10px;
          border:none;
          cursor:pointer;">
          +
          </button>

        </div>

        <button
        onclick="removeItem(${index})"
        style="
        background:red;
        color:white;
        border:none;
        padding:6px 10px;
        cursor:pointer;
        border-radius:6px;">

        Remove

        </button>

      </div>

    </div>

    `;
  });

  cartTotal.textContent = formatNaira(total);

  cartCount.textContent = count;

}

/* ==========================================
   OPEN CART
========================================== */

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});

/* ==========================================
   CLOSE CART
========================================== */

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

/* ==========================================
   MOBILE MENU
========================================== */

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* ==========================================
   PRODUCT SEARCH
========================================== */

searchInput.addEventListener("keyup", () => {

  let value = searchInput.value.toLowerCase();

  let products = document.querySelectorAll(".product-card");

  products.forEach(product => {

    let text = product.innerText.toLowerCase();

    if (text.includes(value)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }

  });

});

/* ==========================================
   CATEGORY FILTER
========================================== */

filters.forEach(button => {

  button.addEventListener("click", () => {

    filters.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const filter = button.dataset.filter;

    const products =
      document.querySelectorAll(".product-card");

    products.forEach(product => {

      if (filter === "all") {

        product.style.display = "block";

      } else if (
        product.classList.contains(filter)
      ) {

        product.style.display = "block";

      } else {

        product.style.display = "none";

      }

    });

  });

});

/* ==========================================
   WHATSAPP CHECKOUT
========================================== */

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }

  let message =
`Hello Agubestco,%0A%0AI want to order:%0A%0A`;

  let total = 0;

  cart.forEach(item => {

    let itemTotal =
      item.price * item.qty;

    total += itemTotal;

    message +=
`${item.name} x ${item.qty} = ₦${itemTotal.toLocaleString()}%0A`;

  });

  message +=
`%0ATotal: ₦${total.toLocaleString()}%0A`;

  message +=
`%0APlease confirm availability.`;

  const whatsappURL =
`https://wa.me/2347034367556?text=${message}`;

  window.open(
    whatsappURL,
    "_blank"
  );

});

/* ==========================================
   TOAST NOTIFICATION
========================================== */

function showToast(message) {

  const toast =
    document.createElement("div");

  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "100px";
  toast.style.right = "20px";
  toast.style.background = "#00d4ff";
  toast.style.color = "#fff";
  toast.style.padding = "14px 20px";
  toast.style.borderRadius = "10px";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "600";
  toast.style.boxShadow =
    "0 10px 30px rgba(0,0,0,.3)";

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.style.opacity = "0";
    toast.style.transition = ".4s";

  }, 1800);

  setTimeout(() => {

    toast.remove();

  }, 2300);

}

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const observer =
new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.style.opacity = "1";

      entry.target.style.transform =
      "translateY(0)";

    }

  });

}, {
  threshold: 0.1
});

document
.querySelectorAll(
".product-card, .category-card, .testimonial, .about-grid div"
)
.forEach(el => {

  el.style.opacity = "0";

  el.style.transform =
  "translateY(40px)";

  el.style.transition =
  ".6s ease";

  observer.observe(el);

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 150;

    if (
      scrollY >= sectionTop
    ) {

      current =
      section.getAttribute("id");

    }

  });

  navItems.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === "#" + current
    ) {

      link.classList.add("active");

    }

  });

});

/* ==========================================
   CLOSE MOBILE MENU ON CLICK
========================================== */

document
.querySelectorAll("nav a")
.forEach(link => {

  link.addEventListener(
  "click",
  () => {

    navLinks.classList.remove(
      "show"
    );

  });

});

/* ==========================================
   INITIALIZE
========================================== */

updateCart();

/* ==========================================
   PRELOADER EFFECT
========================================== */

window.addEventListener(
"load",
() => {

  document.body.style.opacity = "0";

  setTimeout(() => {

    document.body.style.transition =
    ".5s";

    document.body.style.opacity = "1";

  }, 100);

});