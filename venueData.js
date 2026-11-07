const VENUE = {
  name: "City Theatre",

  priceCategories: {
    vip: { label: "VIP", price: 120 },
    premium: { label: "Premium", price: 85 },
    standard: { label: "Standard", price: 55 },
  },

  sections: [
    {
      id: "orchestra",
      name: "Orchestra",
      category: "vip",
      blocks: [
        { id: "orchestra-L", label: "Left", rows: 8, seatsPerRow: 6 },
        { id: "orchestra-C", label: "Center", rows: 8, seatsPerRow: 8 },
        { id: "orchestra-R", label: "Right", rows: 8, seatsPerRow: 6 },
      ],
    },
    {
      id: "mezzanine",
      name: "Mezzanine",
      category: "premium",
      blocks: [
        { id: "mezzanine-L", label: "Left", rows: 6, seatsPerRow: 8 },
        { id: "mezzanine-C", label: "Center", rows: 6, seatsPerRow: 10 },
        { id: "mezzanine-R", label: "Right", rows: 6, seatsPerRow: 8 },
      ],
    },
    {
      id: "balcony",
      name: "Balcony",
      category: "standard",
      blocks: [{ id: "balcony-C", label: "Center", rows: 5, seatsPerRow: 20 }],
    },
  ],
};