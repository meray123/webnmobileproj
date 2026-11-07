const venueSections = document.getElementById("venueSections");

const inspectorEmpty = document.getElementById("inspectorEmpty");
const inspectorDetails = document.getElementById("inspectorDetails");
const detailSection = document.getElementById("detailSection");
const detailSeat = document.getElementById("detailSeat");
const detailCategory = document.getElementById("detailCategory");
const detailPrice = document.getElementById("detailPrice");
const detailStatus = document.getElementById("detailStatus");
const cartActionBtn = document.getElementById("cartActionBtn");

const cartList = document.getElementById("cartList");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");

const canvas = document.getElementById("canvas");

let currentSeat = null;

let cart = [];

let zoomLevel = 1;
let panX = 0;
let panY = 0;

function buildVenue() {
  VENUE.sections.forEach(function (section) {
    const categoryInfo = VENUE.priceCategories[section.category];

    const sectionDiv = document.createElement("div");
    sectionDiv.className = "venue-section";

    const heading = document.createElement("div");
    heading.className = "section-heading";
    heading.textContent = section.name + " (" + categoryInfo.label + " - $" + categoryInfo.price + ")";
    sectionDiv.appendChild(heading);

    const blocksDiv = document.createElement("div");
    blocksDiv.className = "section-blocks";

    section.blocks.forEach(function (block) {
      const blockDiv = document.createElement("div");
      blockDiv.className = "seat-block";

      for (let r = 0; r < block.rows; r++) {
        const row = rowLetter(r);

        const rowDiv = document.createElement("div");
        rowDiv.className = "seat-row";

        for (let s = 0; s < block.seatsPerRow; s++) {
          const seatNumber = s + 1;
          const sold = isSeatSold(r, s);

          const seatBtn = document.createElement("button");
          seatBtn.className = "seat";
          seatBtn.textContent = seatNumber;

          seatBtn.dataset.section = section.name;
          seatBtn.dataset.category = categoryInfo.label;
          seatBtn.dataset.price = categoryInfo.price;
          seatBtn.dataset.row = row;
          seatBtn.dataset.seat = seatNumber;
          seatBtn.dataset.sold = sold;

          if (sold) {
            seatBtn.classList.add("is-sold");
            seatBtn.disabled = true;
          }

          seatBtn.addEventListener("click", function () {
            inspectSeat(seatBtn);
          });

          rowDiv.appendChild(seatBtn);
        }

        blockDiv.appendChild(rowDiv);
      }

      blocksDiv.appendChild(blockDiv);
    });

    sectionDiv.appendChild(blocksDiv);
    venueSections.appendChild(sectionDiv);
  });
}

function inspectSeat(seatBtn) {
  currentSeat = seatBtn;

  inspectorEmpty.hidden = true;
  inspectorDetails.hidden = false;

  detailSection.textContent = seatBtn.dataset.section;
  detailSeat.textContent = "Row " + seatBtn.dataset.row + ", Seat " + seatBtn.dataset.seat;
  detailCategory.textContent = seatBtn.dataset.category;
  detailPrice.textContent = "$" + seatBtn.dataset.price;

  if (seatBtn.classList.contains("is-in-cart")) {
    detailStatus.textContent = "In cart";
    cartActionBtn.textContent = "Remove from Cart";
  } else {
    detailStatus.textContent = "Available";
    cartActionBtn.textContent = "Add to Cart";
  }
}

function addToCart() {
  if (!currentSeat) return;
  if (currentSeat.classList.contains("is-in-cart")) return;

  cart.push({
    section: currentSeat.dataset.section,
    row: currentSeat.dataset.row,
    seat: currentSeat.dataset.seat,
    price: Number(currentSeat.dataset.price),
    seatBtn: currentSeat,
  });

  currentSeat.classList.add("is-in-cart");

  renderCart();
  inspectSeat(currentSeat);
}

function removeFromCart(item) {
  const index = cart.indexOf(item);
  if (index === -1) return;

  cart.splice(index, 1);
  item.seatBtn.classList.remove("is-in-cart");

  renderCart();

  if (currentSeat === item.seatBtn) {
    inspectSeat(currentSeat);
  }
}

function cartButtonClicked() {
  if (!currentSeat) return;

  if (currentSeat.classList.contains("is-in-cart")) {
    const item = cart.find(function (c) {
      return c.seatBtn === currentSeat;
    });
    if (item) removeFromCart(item);
  } else {
    addToCart();
  }
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.hidden = false;
  } else {
    cartEmpty.hidden = true;

    cart.forEach(function (item) {
      const li = document.createElement("li");

      const label = document.createElement("span");
      label.textContent = item.section + " - Row " + item.row + ", Seat " + item.seat + " ($" + item.price + ")";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", function () {
        removeFromCart(item);
      });

      li.appendChild(label);
      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
  }

  let total = 0;
  cart.forEach(function (item) {
    total = total + item.price;
  });
  cartTotal.textContent = "$" + total;
}

cartActionBtn.addEventListener("click", cartButtonClicked);

function updateCanvasView() {
  canvas.style.transform = "translate(" + panX + "px, " + panY + "px) scale(" + zoomLevel + ")";
}

function zoomIn() {
  zoomLevel = zoomLevel + 0.1;
  if (zoomLevel > 2) zoomLevel = 2;
  updateCanvasView();
}

function zoomOut() {
  zoomLevel = zoomLevel - 0.1;
  if (zoomLevel < 0.5) zoomLevel = 0.5;
  updateCanvasView();
}

function moveUp() {
  panY = panY + 40;
  updateCanvasView();
}

function moveDown() {
  panY = panY - 40;
  updateCanvasView();
}

function moveLeft() {
  panX = panX + 40;
  updateCanvasView();
}

function moveRight() {
  panX = panX - 40;
  updateCanvasView();
}

function resetView() {
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  updateCanvasView();
}

document.getElementById("zoomIn").addEventListener("click", zoomIn);
document.getElementById("zoomOut").addEventListener("click", zoomOut);
document.getElementById("moveUp").addEventListener("click", moveUp);
document.getElementById("moveDown").addEventListener("click", moveDown);
document.getElementById("moveLeft").addEventListener("click", moveLeft);
document.getElementById("moveRight").addEventListener("click", moveRight);
document.getElementById("moveReset").addEventListener("click", resetView);

buildVenue();