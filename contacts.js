const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
      return contacts.find((contact) => contact.id == contactId);
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
    id: getRandomIntInclusive(1, 100).toString(),
    name,
    email,
    phone,
  };
  listContacts().then((data) => {
    data.push(newContact);
    console.log(data);
    fs.writeFile(`${contactsPath}`, JSON.stringify(data));
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
