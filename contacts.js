const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  return fs
    .readFile(`${contactsPath}`)
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  return fs
    .readFile(`${contactsPath}`, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      return contacts[contactId];
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  listContacts().then((data) => {
    const contactsListWithoutRemovedContact = data.filter(
      (contact) => Number(contact.id) != contactId
    );
    fs.writeFile(
      `${contactsPath}`,
      JSON.stringify(contactsListWithoutRemovedContact)
    );
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: Math.random(1),
    name,
    email,
    phone,
  };
  console.log(newContact);
  // fs.appendFile(`${contactsPath}`, JSON.stringify(newContact));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
