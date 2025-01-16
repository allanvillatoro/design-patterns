/*
The Repository design pattern is a structural pattern that abstracts data access, providing a centralized way
to manage data operations. By separating the data layer from business logic, it enhances code maintainability,
testability, and flexibility, making it easier to work with various data sources in an application.
*/

//Product entity representing a product
class Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

//Interface for the repository
interface ProductRepository {
  addProduct(product: Product): void;
  getProductById(productId: number): Product;
  updateProduct(product: Product): void;
  deleteProduct(productId: number): void;
}

//Product Repository
//Concrete implementation of the repository (in-memory repository)
class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProductById(productId: number): Product {
    const product = this.products.find((p) => p.id === productId);
    return product || new Product(-1, "Not Found", 0.0);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
  }
}

function mainRepository1() {
  const repository = new InMemoryProductRepository();

  //Adding products
  repository.addProduct(new Product(1, "Product A", 10.99));
  repository.addProduct(new Product(2, "Product B", 15.49));

  //Retrieving a product
  const product = repository.getProductById(1);
  console.log(product); // Output: Product { id: 1, name: 'Product A', price: 10.99 }

  //Updating a product
  repository.updateProduct(new Product(1, "Updated Product A", 12.99));
  console.log(repository.getProductById(1)); // Output: Product { id: 1, name: 'Updated Product A', price: 12.99 }

  //Deleting a product
  repository.deleteProduct(2);
  console.log(repository.getProductById(2)); // Output: Product { id: -1, name: 'Not Found', price: 0 }
}

mainRepository1();
