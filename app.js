// importar
import Product from "./Product.js";
import ProductManager from "./ProductManager.js";

//

// fs = manejo de archivos
const fs = require("fs");

import { promises as fs } from "fs";

class ProductsManager {
  constructor(path) {
    this.path = path;
  }

  isValidProduct(product) {
    return (
      product.title !== null &&
      product.title !== undefined &&
      product.title !== "" &&
      product.description !== null &&
      product.description !== undefined &&
      product.description !== "" &&
      typeof product.price === "number" &&
      !isNaN(product.price) &&
      product.thumbnail !== null &&
      product.thumbnail !== undefined &&
      product.thumbnail !== "" &&
      product.code !== null &&
      product.code !== undefined &&
      product.code !== "" &&
      typeof product.stock === "number" &&
      !isNaN(product.stock)
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
        "Error: El producto no contiene todos los campos requeridos o tienen valores inválidos."
      );
      return;
    } else {
      prods.push(product);
      await fs.writeFile(this.path, JSON.stringify(prods));
    }
  }

  async updateProduct(id, product) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const indice = prods.findIndex((prod) => prod.id === id);

    if (indice != -1) {
      prods[indice].title = product.title;
      prods[indice].description = product.description;
      prods[indice].price = product.price;
      prods[indice].thumbnail = product.thumbnail;
      prods[indice].code = product.code;
      prods[indice].stock = product.stock;
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

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.idIncre();
  }
  static idIncre() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

const Manager = new ProductsManager("./products.json");

const SillaGamer = new Product(
  "Silla gamer",
  "Ostia una silla gamer que flipas",
  500,
  "asd",
  1234,
  3
);

/* 
class ProductManager {
  constructor(path) {
    //path = manejo de rutas y evitar ambigüead al trabajar
    this.path = path;
    this.products = [];
    this.id = 1;
  }

  async addProducts({ title, description, price, thumbnail, code, stock, id }) {
    id = this.id;
    const verificarCode = this.products.some((product) => {
      return product.code === code;
    });
    if (verificarCode) {
      console.log("El valor de code ya se encuentra asignado a otro producto");
    } else if (
      title != "" &&
      description != "" &&
      price != "" &&
      thumbnail != "" &&
      stock != "" &&
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined &&
      stock != undefined &&
      code != "" &&
      code != undefined
    ) {
      try {
        console.log("producto cargado correctamente");
        this.products.push({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id,
        });

        this.id = this.id + 1;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } catch (error) {
        console.log("Este es el error de la promesa escrituraAsync", error);
      }
    } else {
      console.log("Todos los parametros son requeridos");
    }
  }

  async getProducts() {
    try {
      this.products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      console.log(this.products);
    } catch (error) {
      console.log(error);
    }
  }

  getProductById = async (id) => {
    this.products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const resultadoId = this.products.find((e) => e.id === id);
    if (resultadoId) {
      return console.log(resultadoId);
    } else {
      return console.log("Not found");
    }
  };

  updateProduct = async (id, data) => {
    try {
      let productoAActualizar = await this.getProductById(id);
      let productoIndex = this.products.findIndex((e) => e.id === id);
      this.products[productoIndex] = {
        ...productoAActualizar,
        ...data,
        id: id,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      console.log("Producto editado correctamente");
    } catch (error) {
      console.log(
        "🚀 ~ file: PerezBruno-Entregable_2.js:80 ~ ProductManager ~ updateProduct= ~ error",
        error
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      this.products = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      this.products = this.products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log(
        "🚀 ~ file: ProductManager_PerezBruno.js:94 ~ ProductManager ~ deleteProduct ~ error:",
        error
      );
    }
  };
}

// productos
//
const producto1 = new Product("Arroz", "Rico", 300, "AA3019", 20, []);
const producto2 = new Product("Lentejas", "Rico", 300, "LL2091", 20, []);
const producto3 = new Product("Yerba", "Rico", 300, "OE4165", 20, []);
const producto4 = new Product("Yerba", "Rico", 300, "OE4165", 20, []);
//constatar que funciona
// console.log(producto1);

// const para llamar a ProductManager
const productManager = new ProductManager();
// usamos la función
productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);
productManager.addProduct(producto4);

// llamo al método getProduct
productManager.getProducts();
// productManager.getProductsById(3);
*/
