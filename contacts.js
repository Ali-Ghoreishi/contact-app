const fs = require("fs");

const chalk = require("chalk");
const { clearScreenDown } = require("readline");

const addContact = (fullname, phone, email) => {
  const contacts = loadContacts();
  const duplicateContact = contacts.find((c) => c.fullname === fullname);
  if (!duplicateContact) {
    contacts.push({ fullname, phone, email });
    saveContacts(contacts);

    console.log(chalk.green("Contact Saved."));
  } else {
    console.log(chalk.red("Contact already exist ."));
  }
};

const listContacts = () => {
  const contacts = loadContacts();
  if (contacts.length > 0) {
    console.log(chalk.cyan("Your contacts:\n"));
    // console.table(contacts)

    contacts.forEach((contact) => {
      console.log(`\t ${chalk.yellow("Fullname:")} ${contact.fullname}`);
      console.log(`\t ${chalk.yellow("Phone:")} ${contact.phone}`);
      console.log(`\t ${chalk.yellow("Email:")} ${contact.email}`);
      console.log(
        `\t ${chalk.redBright("---------------------------------------")}`
      );
    });
  } else {
    console.log(`${chalk.red("you don't have any contacts")}`);
  }
};

const removeContact = (fullname) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((c) => c.fullname !== fullname);

  if (contacts.length > filteredContacts.length) {
    saveContacts(filteredContacts);
    console.log(chalk.yellow(`${fullname} has been removed.`));
  } else {
    console.log(chalk.red("Contact not found."));
  }
};

const loadContacts = () => {
  try {
    const dataBuffer = fs.readFileSync("contacts.json");
    const contacts = dataBuffer.toString();
    return JSON.parse(contacts);
  } catch (ex) {
    console.log(ex);
    return [];
  }
};

const saveContacts = (contacts) => {
  const data = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", data);
};

module.exports = { addContact, listContacts, removeContact };
