const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data.toString())))
    .catch((err) => console.log(err.message))
}
  
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => 
      JSON.parse(data.toString()).find(
        (contact) => 
          contact.id.toString() === contactId && console.table(contact)
      )
    )
    .catch((err) => console.log(err.message))
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data).filter(
        (contact) => contact.id.toString() !== contactId
      )
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(() => 
          console.log(`contact ${contactId} was successfully deleted`)
        )
        .catch((err) => console.log(err.message))
    })
    .catch((err) => console.log(err.message))
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data)
      const id = uuidv4()
      const newContact = { id, name, email, phone }
      contacts.push(newContact)
      fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(() => console.log(`contact was successfully added`))
        .catch((err) => console.log(err.message))
    })
    .catch((err) => console.log(err.message))
}

module.exports = { listContacts, getContactById, removeContact, addContact }