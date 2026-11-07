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

let currentSeat = null;

let cart = [];

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
  detailStatus.textContent = "Available";
}

function addToCart() {
  if (!currentSeat) return;

  cart.push({
    section: currentSeat.dataset.section,
    row: currentSeat.dataset.row,
    seat: currentSeat.dataset.seat,
    price: Number(currentSeat.dataset.price),
  });

  currentSeat.classList.add("is-in-cart");

  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.hidden = false;
  } else {
    cartEmpty.hidden = true;

    cart.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item.section + " - Row " + item.row + ", Seat " + item.seat + " ($" + item.price + ")";
      cartList.appendChild(li);
    });
  }

  let total = 0;
  cart.forEach(function (item) {
    total = total + item.price;
  });
  cartTotal.textContent = "$" + total;
}

cartActionBtn.addEventListener("click", addToCart);

buildVenue();