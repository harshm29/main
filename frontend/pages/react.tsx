import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if phone number contains only digits and has a valid length
    const phoneRegex = /^\d+$/;
    if (!phone.match(phoneRegex) || phone.length < 10 || phone.length > 12) {
      alert("Please enter a valid phone number with 10 to 12 digits.");
      return;
    }

    addEntryToPhoneBook(firstName, lastName, phone);
    console.log(firstName, lastName, phone);
    setFirstName("");
    setLastName("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        pattern="[A-Za-z]+"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        pattern="[A-Za-z]+"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        minLength={10}
        maxLength={12}
        pattern="[0-9]*"
        value={phone}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {/* Use map to render entries dynamically */}
        {props.entries.map((entry, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{entry.firstName}</td>
            <td style={style.tableCell}>{entry.lastName}</td>
            <td style={style.tableCell}>{entry.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [entries, setEntries] = useState([]);

  const addEntryToPhoneBook = (firstName, lastName, phone) => {
    const newEntry = { firstName, lastName, phone };
    console.log(newEntry);
    const updatedEntries = [...entries, newEntry];
    updatedEntries.sort((a, b) => a.lastName.localeCompare(b.lastName));

    setEntries(updatedEntries);
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable entries={entries} />
    </section>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Application />);
