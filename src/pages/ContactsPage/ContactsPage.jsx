import { useDispatch } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import s from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Contacts</h2>
      <div className={s.box}>
        <ContactForm />
        <div className={s.search}>
          <SearchBox />
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
