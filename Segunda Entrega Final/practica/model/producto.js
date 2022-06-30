class Producto {
  constructor(timestamp, name, description, thumbnail, code, price, stock) {
    this.timestamp = timestamp;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.id = 0;
  }
}
module.exports = Producto;