import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Nika",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: "1",
      name: "Bohemian TearDrop Earrings",
      slug: "bohemian-teardrop-earrings",
      category: "Jewelry",
      image: "/images/p1.jpg",
      price: 15,
      countInStock: 0,
      brand: "ZukaJewls",
      rating: 4.5,
      numReviews: 10,
      description: "Bohemian TearDrop Earrings",
    },
    {
      //_id: "2",
      name: "Flowers dangle earrings",
      slug: "flowers-dangle-earrings",
      category: "Jewelry",
      image: "/images/p2.jpg",
      price: 21,
      countInStock: 20,
      brand: "ZukaJewls",
      rating: 4.0,
      numReviews: 10,
      description: "Flowers dangle earrings",
    },
    {
      //_id: "3",
      name: "Green TearDrop Earrings",
      slug: "green-teardrop-earrings",
      category: "Jewelry",
      image: "/images/p3.jpg",
      price: 11,
      countInStock: 15,
      brand: "ZukaJewls",
      rating: 4.5,
      numReviews: 14,
      description: "Green TearDrop Earrings",
    },
    {
      //_id: "4",
      name: "Leather Dog Collar with Engraved Name Plate",
      slug: "leather-dog-collar-with-engraved-name-plate",
      category: "Pet Supplies",
      image: "/images/p4.jpg",
      price: 15,
      countInStock: 5,
      brand: "BronzeDog",
      rating: 4.5,
      numReviews: 10,
      description: "Leather Dog Collar with Engraved Name Plate",
    },
  ],
};

export default data;
