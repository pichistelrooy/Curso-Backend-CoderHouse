let listaCarritos = [];
let listaProductos = [];

class ContenedorMemory {
  /**
   * @param {string} data
   * @returns none
   */
  async saveCart(data) {
    try {
      listaCarritos.push(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Return all data in the file
   * @params none
   * @returns a object of file data
   */
  async getAllCarts() {
    try {
      console.log("USSANDO MEMORY");
      return listaCarritos;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a product by ID
   * @param {int} id
   * @returns none
   */
  async deleteCartById(id) {
    try {
      let datafile = listaCarritos.filter((data) => {
        return data.id != id;
      });
      listaCarritos = datafile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} data
   * @returns none
   */
  async saveAllCart(data) {
    try {
      listaCarritos = data;
    } catch (error) {
      throw error;
    }
  }
  
/**
   * @param {string} data
   * @returns none
   */
 async saveProduct(data) {
  try {
    listaProductos.push(data);
  } catch (error) {
    throw error;
  }
}

/**
 * Return all data in the file
 * @params none
 * @returns a object of file data
 */
async getAllProducts() {
  try {
    return listaProductos;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a product by ID
 * @param {int} id
 * @returns none
 */
async deleteProductById(id) {
  try {
    let datafile = listaProductos.filter((data) => {
      return data.id != id;
    });
    listaProductos = datafile;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {string} data
 * @returns none
 */
async saveAllproduct(data) {
  try {
    listaProductos = data;
  } catch (error) {
    throw error;
  }
}

}

module.exports = ContenedorMemory;
