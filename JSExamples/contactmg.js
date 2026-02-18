// Real scenario: Phone contacts management
const contacts = new Map();

// Function to add contact (using const and destructuring)
const addContact = (name, phone, email) => {
  contacts.set(name, { phone, email });
};

// Function to find contact
const findContact = (name) => {
  const contact = contacts.get(name);
  if (contact) {
    // Object destructuring in action
    const { phone, email } = contact;
    console.log(`📞 Contact found:
    Name: ${name}
    Phone: ${phone}
    Email: ${email}`);
  } else {
    console.log(`❌ Contact "${name}" not found`);
  }
};

// Usage
addContact('John Doe', '555-0123', 'john@email.com');
addContact('Jane Smith', '555-0456', 'jane@email.com');

findContact('John Doe');