class ProductService {
  async getProducts(session, Shopify) {
    console.log(session)
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );
    const countData = await Product.all({ session });

    return countData;
  }

  async getProductById(session, Shopify, id) {
    const { Product } = await import(
        `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
      );
      const data = await Product.find({ session, id });

    return data;
  }
}

export const productService = new ProductService();
