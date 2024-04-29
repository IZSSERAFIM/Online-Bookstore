export async function getBooks() {
  return await fetch("http://localhost:8080/books").then((res) => res.json());
}
