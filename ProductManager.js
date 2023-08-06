/*

class ProductManager {
  constructor(path) {
    //path = manejo de rutas y evitar ambigüead
    this.path = path;
    this.products = [];
  }
  addProduct(product) {
    const prod = this.products.find((prod) => prod.code === product.code);

    //agregándose ahora que si existe lo avise
    if (prod) {
      console.log("producto existe");
    } else {
      this.products.push(product);
    }
  }
  getProducts() {
    console.log(this.products);
  }
  getProductsById(id) {
    const prod = this.products.find((prod) => prod.id === id);
    //si existe que lo muestre y sino que diga 'no existe'
    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto no existe");
    }
  }
  totalStock() {
    let totalStock = 0;
    for (const product of ProductManager.products) {
      totalStock += product.stock;
    }
    return totalStock;
  }
}

export default ProductManager;

*/

import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  isValidProduct(product) {
    return (
      product.title !== null &&
      product.title !== undefined &&
      product.title !== "" &&
      product.description !== null &&
      product.description !== undefined &&
      product.description !== "" &&
      product.thumbnail !== null &&
      product.thumbnail !== undefined &&
      product.thumbnail !== "" &&
      product.code !== null &&
      product.code !== undefined &&
      product.code !== "" &&
      typeof product.price === "number" &&
      typeof product.stock === "number"
    );
  }

  async getProducts() {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(prods);
  }

  async getProductsById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prods.find((product) => product.id === id);

    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto inexistente");
    }
  }

  async addProduct(product) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prodId = prods.find((producto) => producto.id === product.id);
    const prodCode = prods.find((producto) => producto.code === product.code);

    if (prodId || prodCode) {
      console.log("Ese producto ya existe");
    } else if (!this.isValidProduct(product)) {
      console.error(
        "Error: Faltan campos requeridos o tienen valores inválidos."
      );
      return;
    } else {
      prods.push(product);
      await fs.writeFile(this.path, JSON.stringify(prods));
    }
  }

  totalStock() {
    let totalStock = 0;
    for (const product of ProductManager.products) {
      totalStock += product.stock;
    }
    return totalStock;
  }

  async updateProduct(id, product) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const index = prods.findIndex((prod) => prod.id === id);

    if (index != -1) {
      prods[index].title = product.title;
      prods[index].description = product.description;
      prods[index].price = product.price;
      prods[index].thumbnail = product.thumbnail;
      prods[index].code = product.code;
      prods[index].stock = product.stock;
      await fs.writeFile(this.path, JSON.stringify(prods));
    } else {
      console.log("Producto inexistente");
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prods.find((product) => product.id === id);

    if (prod) {
      await fs.writeFile(
        this.path,
        JSON.stringify(prods.filter((prod) => prod.id != id))
      );
    } else {
      console.log("Producto inexistente");
    }
  }
}

export default ProductManager;
