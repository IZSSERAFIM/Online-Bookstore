export async function getOrders() {
  return await fetch("http://localhost:8080/orders").then((res) => res.json());
}
