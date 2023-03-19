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
      description:
        "High-quality picture is printed on waterproof paper and protected with a glass cabochon. All findings are Nickel Free.",
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
      description:
        "High-quality picture is printed on waterproof paper and protected with a glass cabochon. All findings are Nickel Free.",
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
      description:
        "These earrings are available as screw in clip on earrings or for pierced ear, (select the style when ordering from the drop down bar). High-quality picture is printed on waterproof paper and protected with a glass cabochon. All findings are Nickel Free.",
    },
    {
      //_id: "4",
      name: "Leather Dog Collar",
      slug: "leather-dog-collar",
      category: "Pet Supplies",
      image: "/images/p4.jpg",
      price: 15,
      countInStock: 5,
      brand: "BronzeDog",
      rating: 4.5,
      numReviews: 10,
      description:
        "Collars are made of full grain cowhide leather on top and soft padded leather base. We use high quality buckle (shape of the buckle may vary) and very strong D ring. We make these collars in two basic tops: Black top and Brown top. You can choose from drop down menu best color combination. We make these collars in 4 sizes. Collars are supplied with solid brass nameplate.",
    },
    {
      //_id: "5",
      name: "Carstens Ceramic Vase",
      slug: "carstens-ceramic-vase",
      category: "Vases",
      image: "/images/p5.jpg",
      price: 34,
      countInStock: 12,
      brand: "OberSchick",
      rating: 2.5,
      numReviews: 55,
      description:
        "Great vase of Carstens pottery from the 70s. Hand flattering blue/black matte glaze. Super shape with a very nice décor. Good undamaged vintage condition. Ground mark: W.Germany 3-25. Height: 25 cm ",
    },
    {
      //_id: "6",
      name: "Bougainvilleas Wall Art",
      slug: "bougainvilleas-wall-art",
      category: "Wall decor",
      image: "/images/p6.jpg",
      price: 4,
      countInStock: 40,
      brand: "StarPaintTwoD",
      rating: 4.5,
      numReviews: 51,
      description:
        "Digital Printable File, Instant Download. After your purchase you will receive an email from etsy with the below 4 JPG files in RGB 300dpi : 1. Aspect ratio 2x3 suitable for printing: 12x18 inc / 30x45cm. 8x12 inc / 20x30cm. 4x6 inc / 10x15cm",
    },
    {
      //_id: "7",
      name: "40cm Wooden Lamp Design",
      slug: "40cm-wooden-lamp-design",
      category: "Lighting",
      image: "/images/p7.jpg",
      price: 210,
      countInStock: 150,
      brand: "ArtByRoses",
      rating: 3.5,
      numReviews: 146,
      description:
        "Design lighting in varnished exotic wood. 40 cm diameter, 30cm high, (bulb E27, preferably opaque) Artisanal manufacturing with laser cutting. This luminaire gives a soft and subdued lighting, it creates a warm atmosphere, the shadow of the leaves is reflected on the ceiling. Ideal for one bedroom.",
    },
    {
      //_id: "8",
      name: "Mid Century Modern Wooden Lamp",
      slug: "Mid Century Modern Wooden Lamp",
      category: "Lighting",
      image: "/images/p8.jpg",
      price: 160,
      countInStock: 400,
      brand: "ArtByRoses",
      rating: 4,
      numReviews: 58,
      description:
        "This handmade wood pendant light combines contemporary industrial design with a mid-century modern feeling. What is so unique about this lamp is the fact that it creates streams of shadow and light on the ceiling and walls. The stronger the light, the bigger the casting shadows. Like a modern chandelier, it would fit perfectly in every room emphasizing how geometry and modern art could provide a warm lighting environment. Our customers have stated that it looks like an absolute “piece of jewelry”.",
    },
    {
      //_id: "9",
      name: "Frida Kahlo Crochet Doll",
      slug: "frida-kahlo-crochet-doll",
      category: "Toys",
      image: "/images/p9.jpg",
      price: 22,
      countInStock: 14,
      brand: "Zeylum",
      rating: 2.5,
      numReviews: 5,
      description:
        "Introducing our 11-inch Frida Kahlo inspired crochet cotton stuffed doll! This unique and beautiful doll is a perfect tribute to the iconic Mexican painter and surrealist icon, Frida Kahlo. Frida Kahlo was a self-taught artist, who is best known for her vivid self-portraits that reflect her strong feelings. Her works of art not only offer a glimpse into her personal life but also showcase the cultural heritage of Mexico. Our doll is designed to capture the essence of Frida Kahlo, with her signature vibrant shawl, and distinctive eyebrows.",
    },
    {
      //_id: "10",
      name: "Oval Wood Earring Copper Tear",
      slug: "oval-wood-earring-copper-tear",
      category: "Jewelry",
      image: "/images/p10.jpg",
      price: 19,
      countInStock: 48,
      brand: "ZukaJewls",
      rating: 1.5,
      numReviews: 15,
      description:
        "Since my Earrings are made to order from natural and unique gemstones, they might appear slightly different than on the pictures. Please feel free to ask for a picture of your order for approval before shipment. All the Jewelry are cleaned with Sage before the shipping. Earring made with a stained wood oval and a printed antique copper teardrop. Total size is 3 inches. The clip is made of antique copper.",
    },
    {
      //_id: "11",
      name: "Bamboo Pendant Light",
      slug: "Bamboo Pendant Light",
      category: "Lighting",
      image: "/images/p11.jpg",
      price: 28,
      countInStock: 150,
      brand: "ArtByRoses",
      rating: 3,
      numReviews: 60,
      description:
        "The basket is compressible/expandable like a concertina and can achieve many shapes and position - the oblong shape is the natural position/shape - the round shapes as shown in the listing pictures for example are achieved simply by compressing from each end, and tying the supplied string inside to pull taut as shown to then hold in desired position. e.g The third picture shows standard oblong baskets, one of which has been made into a round ball shape.",
    },
    {
      //_id: "12",
      name: "Field Of Flowers Art Canvas",
      slug: "field-of-flowers-art-canvas",
      category: "Wall decor",
      image: "/images/p12.jpg",
      price: 65,
      countInStock: 4,
      brand: "StarPaintTwoD",
      rating: 5,
      numReviews: 20,
      description:
        "Extra Large Vintage Flower Field Landscape Tapestry. Easily fill up a large amount of wall space with our oversized tapestries. Available in 6 sizes (shown below and in the drop down menu). Our hanging tapestry is printed on 100% cotton canvas. Frames are made of pine and are naturally lightweight. Very easy to hang with two attached sawtooth hangers.",
    },
    {
      //_id: "13",
      name: "Folk Pendant Necklace",
      slug: "folk-pendant-necklace",
      category: "Jewelry",
      image: "/images/p13.jpg",
      price: 12,
      countInStock: 46,
      brand: "ZukaJewls",
      rating: 3,
      numReviews: 10,
      description:
        "Select from an Antique Bronze or Shiny Silver finish. High-quality picture is printed on waterproof paper and protected with a glass cabochon. All findings are Nickel Free.",
    },
    {
      //_id: "14",
      name: "Personalized Dog Leash Leather",
      slug: "personalized-dog-leash-leather",
      category: "Pet Supplies",
      image: "/images/p14.jpg",
      price: 32,
      countInStock: 89,
      brand: "BronzeDog",
      rating: 3.5,
      numReviews: 67,
      description:
        "The walks in the park will literally feel different, as this high-quality leather's contact with your hand is something that needs to be experienced. Time and use only add to this feeling as it is the material's characteristic to become more personal after use. Add the personalized, exclusively handcrafted name plate and you have something truly one-of-a-kind!",
    },
    {
      //_id: "15",
      name: "Rattan Woven Vase",
      slug: "rattan-woven-vase",
      category: "Vases",
      image: "/images/p15.jpg",
      price: 32,
      countInStock: 19,
      brand: "OberSchick",
      rating: 4.5,
      numReviews: 3,
      description:
        "This product is a woven flower vase, it looks very beautiful. Made with premium material, so this product is durable, and you can use it for a long time. Suitable for wedding flower and also decorating your room. Putting some beautiful flowers, it is an attractive gift for your receivers. It can be put in your living room, bedroom, office, and so on. As a decoration for yourself or a gift to friends.",
    },
    {
      //_id: "16",
      name: "Waldorf Custom Doll",
      slug: "waldorf-custom-doll",
      category: "Toys",
      image: "/images/p16.jpg",
      price: 83,
      countInStock: 200,
      brand: "Zeylum",
      rating: 5,
      numReviews: 157,
      description:
        "Introducing our handmade organic Waldorf doll, made with safe and natural materials for your child's imaginative play. Our doll is designed with a soft cotton body and wool hair, encouraging imaginative play and connection with nature. The doll is safe for children of all ages and its natural materials are gentle on skin. Every detail is thoughtfully crafted, the face is hand-painted and features are embroidered, making each doll unique. The wool stuffing provides a nice weight, making it easy to hug and cuddle. The wool hair is also soft and easy to style, making it perfect for children who love to play hairdresser.",
    },
    {
      //_id: "17",
      name: "Wood Pendant Ceiling Light",
      slug: "wood-pendant-ceiling-light",
      category: "Lighting",
      image: "/images/p17.jpg",
      price: 115,
      countInStock: 38,
      brand: "ArtByRoses",
      rating: 4,
      numReviews: 7,
      description:
        "Our “mineral” chandelier is an epitome of industrial aesthetic combined with modern contemporary art and geometry mixing wood and plexiglass together. This lamp provides a very specific effect on the walls and could totally transform your bedroom and your dining room. It is made of Veneered Oak MDF, an excellent quality real oak wood that is bonded to MDF providing iconic natural grains. Exceptional characteristics of stability, durability, and maintenance in time distinguished it.",
    },
    {
      //_id: "18",
      name: "Floral Embroidery Kit",
      slug: "floral-embroidery-kit",
      category: "Fiber Arts",
      image: "/images/p18.jpg",
      price: 20,
      countInStock: 32,
      brand: "Zazarita",
      rating: 3.5,
      numReviews: 77,
      description:
        "This hand embroidery kit will include everything you need to start the project and it is a great Kit for Beginners too! These embroidery kits are the best gifts for mom , sewing lovers and embroidery lovers, a great present for Christmas and the mothers day.",
    },
    {
      //_id: "19",
      name: "Wool Moroccan Rug",
      slug: "Wool Moroccan Rug",
      category: "Fiber Arts",
      image: "/images/p19.jpg",
      price: 870,
      countInStock: 28,
      brand: "Zazarita",
      rating: 4,
      numReviews: 217,
      description:
        "These vintage rugs from boujaad are probably the most comfortable vintage rugs you will ever come across. They are made from 100% sheep's wool and are 100% undyed. These handmade rugs are made for those who truly appreciate the natural world. They are the epitome of warmth and luxury. All Azilal rugs share a signature style with geometric patterns. It is a classic design for any room. You will also see symbols. They tell true stories of each weaver's life.",
    },
    {
      //_id: "20",
      name: "Needle Felted Blue Tit",
      slug: "needle-felted-blue-tit",
      category: "Fiber Arts",
      image: "/images/p20.jpg",
      price: 28,
      countInStock: 391,
      brand: "Zazarita",
      rating: 4.5,
      numReviews: 10,
      description:
        "This Cute Little Bluetit is needle felted. His body and beak are made of natural wool and he has black beads for eyes. He measures approx 4,5 (11 cm) from beak to tail.",
    },
    {
      //_id: "21",
      name: "Leather cover for Leuchtturm",
      slug: "leather-cover-for-leuchtturm",
      category: "Books",
      image: "/images/p21.jpg",
      price: 27,
      countInStock: 0,
      brand: "LeatherBookMaker",
      rating: 4.5,
      numReviews: 67,
      description:
        "Simple design leather cover for LEUCHTTURM1917 NOTEBOOK MEDIUM (A5) , this slim notebook cover was made of high quality cow leather, 100% hand sewn using saddle stitch , slit cut for elastic band. we also could engrave something on it if you like.",
    },
    {
      //_id: "22",
      name: "Vintage Photo Album",
      slug: "vintage-photo-album",
      category: "Books",
      image: "/images/p22.jpg",
      price: 39,
      countInStock: 40,
      brand: "LeatherBookMaker",
      rating: 5,
      numReviews: 9,
      description:
        "The handmade album scrapbook with genuine leather, the best gift for you and your loved ones, an ideal gift for Valentine's Day, Mother's Day, Father's Day, Christmas, Wedding, Birthday, Graduation or Anniversary, which will become a very wonderful memory.",
    },
    {
      //_id: "23",
      name: "Teardrop Earrings With Birds",
      slug: "teardrop-earrings-with-birds",
      category: "Jewelry",
      image: "/images/p23.jpg",
      price: 11,
      countInStock: 99,
      brand: "ZukaJewls",
      rating: 1.5,
      numReviews: 11,
      description:
        "These earrings are available as screw in clip on earrings or for pierced ear, (select the style when ordering from the drop down bar). High-quality picture is printed on waterproof paper and protected with a glass cabochon. All findings are Nickel Free.",
    },
    {
      //_id: "24",
      name: "Abstract Colorful Oil Painting",
      slug: "abstract-colorful-oil-painting",
      category: "Wall decor",
      image: "/images/p24.jpg",
      price: 115,
      countInStock: 39,
      brand: "StarPaintTwoD",
      rating: 3.5,
      numReviews: 132,
      description:
        "Unframed/Not stretched. Not Ready to Hang. Rolled Canvas sent with 2 inches border for framing. MADE-TO-ORDER painting and be Customizable whatever you want. (size, color, etc.). Abstract Colorful Textured Oil Painting on Canvas, Large Minimalist Original Handmade Acrylic Painting Modern Wall Art Living Room Home Decor",
    },
    {
      //_id: "25",
      name: "Luxury Ceramic Vases",
      slug: "luxury-cramic-vases",
      category: "Vases",
      image: "/images/p25.jpg",
      price: 49,
      countInStock: 65,
      brand: "OberSchick",
      rating: 1,
      numReviews: 2,
      description:
        "Set of 2 Luxury Minimalistic Ceramic Vases - Available to purchase separately. Set a new tone to your living space and will be the best choice for gifting to your loved ones.",
    },
    {
      //_id: "26",
      name: "Engraved Notebook Personalized",
      slug: "engraved-notebook-personalized",
      category: "Books",
      image: "/images/p26.jpg",
      price: 8,
      countInStock: 20,
      brand: "LeatherBookMaker",
      rating: 4.5,
      numReviews: 72,
      description:
        "These notebooks are great for recording your experiences, ideas and time. Some other applications include a travel journal, a cook book for recipes, a devotional or even tracking your exercise/training progress.",
    },
    {
      //_id: "27",
      name: "Metalwork Embroidery Fox Kit",
      slug: "metalwork-embroidery-fox-kit",
      category: "Fiber Arts",
      image: "/images/p27.jpg",
      price: 51,
      countInStock: 83,
      brand: "Zazarita",
      rating: 3.5,
      numReviews: 87,
      description:
        "In this kit you can make a cute Fox design, embroidered in 3 Metalwork techniques over 3 layers of felt padding. The Fox is worked in Metalwork embroidery, a technique seen throughout history on pieces such as haute couture garments, ceremonial and military dress, and ecclesiastical furnishings. Its richness and opulence was a symbol of wealth and power, and fine examples can be seen on the Queens coronation robe as well as high fashion today.",
    },
    {
      //_id: "28",
      name: "3D Printed Articulated Dragon",
      slug: "3d-printed-articulated-dragon",
      category: "Toys",
      image: "/images/p28.jpg",
      price: 47,
      countInStock: 221,
      brand: "Zeylum",
      rating: 2,
      numReviews: 6,
      description:
        "We assemble Braq with elastic string as tightly as possible so that it will hold it's pose. We use a special method so that it will hold it's pose much better than others. Spotless clean. Quality print. Will be shipped in a BOX to avoid any damage during shipping.",
    },
    {
      //_id: "29",
      name: "Bonsai Rustic Decor Light",
      slug: "bonsai-rustic-decor-light",
      category: "Lighting",
      image: "/images/p29.jpg",
      price: 19,
      countInStock: 100,
      brand: "ArtByRoses",
      rating: 5,
      numReviews: 432,
      description:
        "Inspired by growing up with big trees this night light is perfect for bedrooms, nurseries, bathrooms, hallways, kitchens, corridor and more! Choose Standard or Deluxe. Standard - Night Light has only the Front Plate Design. Deluxe - Night Light has Sides with Detailed Designs on it.",
    },
    {
      //_id: "30",
      name: "Personalised Dog Collar",
      slug: "personalised-dog-collar",
      category: "Pet Supplies",
      image: "/images/p30.jpg",
      price: 25,
      countInStock: 991,
      brand: "BronzeDog",
      rating: 3.5,
      numReviews: 239,
      description:
        "My aim is to offer to our four legged best friends stylish and comfortable handmade leather collars for secure walks! Such as these gorgeous leather dog collars handcrafted in my workshop completely by hand with lots of love and attention to details. The patterns are cut by hand and hand punched without the use of any machines or electricity. This kind of leather is incredibly durable, flexible and really strong for every breed.",
    },
  ],
};

export default data;
