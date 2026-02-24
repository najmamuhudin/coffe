const recentProducts = [
  {
    id: 1,
    name: "Spice Iceland Blend",
    type: "New",
    price: 12,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
    description:
      "A rich and complex blend inspired by the volcanic landscapes of Iceland, with notes of dark chocolate, smoky wood, and a hint of exotic spice.",
  },
  {
    id: 2,
    name: "Hair Blender",
    type: "Bio",
    price: 12,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    description:
      "A smooth, velvety blend crafted from the finest arabica beans with a gentle, creamy finish that pairs beautifully with steamed milk.",
  },
  {
    id: 3,
    name: "Cold Brew Blend",
    type: "New",
    price: 16,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop",
    description:
      "Specially crafted for cold brewing with a naturally sweet, low-acid profile. Produces an incredibly smooth and refreshing cold brew every time.",
  },
  {
    id: 4,
    name: "Honduras EL Fuente",
    type: "Bio",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop",
    description:
      "Single-origin coffee from the El Fuente farm in Honduras. A bright, fruit-forward cup with notes of citrus, caramel, and a clean, lingering finish.",
  },
];

const accessories = [
  {
    id: 101,
    name: "Moka CM6 Thermal Carafe",
    type: "Accessories",
    oldPrice: 22,
    price: 12,
    badge: "+30",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
    description:
      "A classic Italian-style moka pot with a modern insulated carafe to keep your coffee warm for hours. Built from premium stainless steel.",
  },
  {
    id: 102,
    name: "Ember Cup",
    type: "Accessories",
    oldPrice: 12,
    price: 6.48,
    badge: "$30",
    isNew: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    description:
      "A smart temperature-controlled mug that keeps your coffee at the perfect drinking temperature. Connect via app to customize your ideal temperature.",
  },
  {
    id: 103,
    name: "Bopso F13 French Press",
    type: "Accessories",
    oldPrice: 10,
    price: 5.22,
    badge: "$20",
 image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
    description:
      "A precision-engineered French press with a double-wall borosilicate glass carafe and ultra-fine mesh filter for a pure, sediment-free cup.",
  },
];

const coffeeBeans = [
  {
    id: 201,
    name: "Espresso",
    type: "Coffee Beans",
    price: 3.5,
    image: "https://images.unsplash.com/photo-1510707577719-af7c183f1fdf?q=80&w=600&auto=format&fit=crop",
    description: "A concentrated coffee brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.",
  },
  {
    id: 202,
    name: "Latte",
    type: "Coffee Beans",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=600&auto=format&fit=crop",
    description: "A coffee drink made with espresso and steamed milk.",
  },
  {
    id: 203,
    name: "Dark Roast Blend",
    type: "Coffee Beans",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop",
    description: "A bold and intense dark roast with low acidity and a full body, featuring notes of dark chocolate and toasted oak.",
  },
];

export { recentProducts, accessories, coffeeBeans };

const products = [...recentProducts, ...accessories, ...coffeeBeans];
export default products;
