import Product from "../DB/productDBcreate.js";
import expressAsyncHandler from "express-async-handler";
import express from "express";

const productLinkSetup = express.Router();

productLinkSetup.get("/", async (request, respond) => {
  const products = await Product.find();
  respond.send(products);
});

productLinkSetup.get(
  '/search',
  expressAsyncHandler(async (request, respond) => {
    const { query } = request;
    const pageSize = query.pageSize || 6;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const getAllFilters =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const getCategoryFilter = category && category !== 'all' ? { category } : {};
    const getRatingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const getPriceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const products = await Product.find({
      ...getAllFilters,
      ...getCategoryFilter,
      ...getPriceFilter,
      ...getRatingFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const getCountedProducts = await Product.countDocuments({
      ...getAllFilters,
      ...getCategoryFilter,
      ...getPriceFilter,
      ...getRatingFilter,
    });
    respond.send({
      products,
      getCountedProducts,
      page,
      pages: Math.ceil(getCountedProducts / pageSize),
    });
  })
);

productLinkSetup.get(
  "/categories",
  expressAsyncHandler(async (request, respond) => {
    const categories = await Product.find().distinct("category");
    respond.send(categories);
  })
);

productLinkSetup.get("/productTag/:productTag", async (request, respond) => {
  const product = await Product.findOne({ productTag: request.params.productTag });
  if (product) {
    respond.send(product);
  } else {
    respond.status(404).send({ message: "Product missing!" });
  }
});

productLinkSetup.get("/:id", async (request, respond) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    respond.send(product);
  } else {
    respond.status(404).send({ message: "Product Not Found" });
  }
});

export default productLinkSetup;
