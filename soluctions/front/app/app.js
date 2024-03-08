const url = "http://localhost:3000";
let flow = 'add';

window.onload = function () {
  displayerItems();

  function displayerItems() {
    fetch(url + "/api/items")
      .then((response) => response.json())
      .then((data) => {
        const itemsContainer = document.getElementById("items-container");
        itemsContainer.innerHTML = "";
        const title = document.createElement("div");
        title.textContent = data.message;
        itemsContainer.appendChild(title);
        data.items.forEach((item) => {
          const itemElement = document.createElement("div");
          itemElement.textContent = `ID: ${item.id}, Nombre: ${item.name}`;
          const updateButton = document.createElement("button");
          updateButton.setAttribute("class", "update-button");
          updateButton.textContent = "Actualizar";
          updateButton.addEventListener("click", function() {
            updateItem(item);
          });
          const deleteButton = document.createElement("button");
          deleteButton.setAttribute("class", "delete-button");
          deleteButton.textContent = "Eliminar";
          deleteButton.addEventListener("click", function() {
            deleteItem(item);
          });

          itemElement.appendChild(updateButton);
          itemElement.appendChild(deleteButton);
          itemsContainer.appendChild(itemElement);
        });
      })
      .catch((error) => console.error("Error fetching items:", error));
  }

  function updateItem(item) {
    document.getElementById("itemId").value = item.id;
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemId").readOnly = true; 
    flow = 'update';
  }

  function saveItem() {

    let itemId = document.getElementById("itemId").value;
    let itemName = document.getElementById("itemName").value;

    let method, endpoint;
    if (flow === 'update') {
      method = "PUT";
      endpoint = `${url}/api/update/${itemId}`;
    } else {
      method = "POST";
      endpoint = `${url}/api/add`;
    }

    fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId, name: itemName }),
      })
      .then((response) => response.json())
      .then((data) => {
     
        if (!data.error) {
            displayMessage(data);
          return displayerItems();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => console.error("Error saving item:", error));

      itemId = null;
      itemName = null;

      document.getElementById("itemId").value = null;
      document.getElementById("itemName").value = null;
      document.getElementById("itemId").readOnly = false;
      flow = 'add';
  }


  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function (event) {
    event.preventDefault(); 
    saveItem(); 
  });

  function deleteItem(item) {
    fetch(`${url}/api/delete/${item.id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {

        if (!data.error) {
            displayMessage(data);
            displayerItems();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  }

  function displayMessage(data) {
    const messageElement = document.createElement("div");
    messageElement.setAttribute("class", "message");
    messageElement.textContent = data.message;
    document.body.appendChild(messageElement);
    
    setTimeout(function() {
      document.body.removeChild(messageElement);
    }, 4000); 
  }
};
