console.log("Aqui");
const socket = io();

const updateProductTable = (productsData) => {
  console.log(productsData);
  const tableBody = document.querySelector("#productsTable tbody");

  // Iterate through the products and create new rows
  productsData.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.code}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td><img src= ${product.thumbmail} alt=${product.title}></td>
      <td> <button onclick="handleDelete(${product.id})">X</button> </td>
    `;
    tableBody.appendChild(row);
  });
};

socket.on("Updated_Products", (data) => {
  try {
    updateProductTable(data);
  } catch (error) {
    console.log(error);
  }
});

const handleDelete = (id) => {
  socket.emit("delete", { id });
  window.location.reload();
};
