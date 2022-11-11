const contactsFunc = require("./contacts.js");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsFunc.listContacts().then(console.log);
      break;

    case "get":
      contactsFunc.getContactById(id).then(console.log);
      break;

    case "add":
      contactsFunc.addContact(name, email, phone);
      break;

    case "remove":
      contactsFunc.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// contactsFunc.listContacts().then(console.log);
// contactsFunc.getContactById(5).then(console.log);
// contactsFunc.removeContact(2);
// contactsFunc.addContact(
//   "Allen Raymond",
//   "nulla.ante@vestibul.co.uk",
//   "(992) 914-3792"
// );
