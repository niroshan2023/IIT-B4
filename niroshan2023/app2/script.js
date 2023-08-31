const contactContainer = document.getElementById("contactContainer");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addContactBtn = document.getElementById("addContactBtn");

addContactBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const email = emailInput.value;
    
    if (name && email) {
        const contact = createContact(name, email);
        contactContainer.appendChild(contact);
        clearInputs();
    }
});

function createContact(name, email) {
    const contactDiv = document.createElement("div");
    contactDiv.className = "contact";
    
    const nameLabel = document.createElement("p");
    nameLabel.textContent = `Name: ${name}`;
    
    const emailLabel = document.createElement("p");
    emailLabel.textContent = `Email: ${email}`;
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        contactContainer.removeChild(contactDiv);
    });
    
    contactDiv.appendChild(nameLabel);
    contactDiv.appendChild(emailLabel);
    contactDiv.appendChild(deleteBtn);
    
    return contactDiv;
}

function clearInputs() {
    nameInput.value = "";
    emailInput.value = "";
}
