const venueSections = document.getElementById("venueSections");

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

          if (sold) {
            seatBtn.classList.add("is-sold");
            seatBtn.disabled = true;
          }

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

buildVenue();