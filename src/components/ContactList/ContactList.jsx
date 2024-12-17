import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";

import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div className={s.wrapper}>
      <ul className={s.card}>
        {contacts.map((contact) => (
          <Contact key={contact.id} {...contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
