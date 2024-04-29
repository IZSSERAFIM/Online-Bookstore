export async function getCartItems() {
  return await fetch("http://localhost:8080/carts").then((res) => res.json());
}
