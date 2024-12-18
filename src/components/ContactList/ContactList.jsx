import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Contact from "../Contact/Contact";
import { updateContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import s from "./ContactList.module.css";

Modal.setAppElement("#root");

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const initialValues = currentContact
    ? { name: currentContact.name, number: currentContact.number }
    : { name: "", number: "" };

  const handleOpenModal = (contact) => {
    if (!isModalOpen) {
      setCurrentContact(contact);
      setIsModalOpen(true);
    }
  };

  const re = /^\d{10}$/;
  const OrderSchema = Yup.object({
    name: Yup.string()
      .min(3, "мінімальна кількість символів - 3")
      .max(20, "максимальна кількість символів - 20")
      .required("Це поле є обов'язковим"),
    number: Yup.string()
      .matches(re, "Тільки цифри -10 символів  ")
      .max(10, "максимальна кількість символів - 10")
      .required("Це поле є обов'язковим"),
  });
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentContact(null);
  };
  const handleUpdateContact = async (values) => {
    try {
      await dispatch(
        updateContact({
          id: currentContact.id,
          updates: values,
        })
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            {...contact}
            onEdit={() => handleOpenModal(contact)}
          />
        ))}
      </ul>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Edit Contact"
        >
          <h2>Edit Contact</h2>
          <Formik
            validationSchema={OrderSchema}
            onSubmit={handleUpdateContact}
            initialValues={initialValues}
          >
            <Form className={s.form}>
              <label className={s.label}>
                <span>Name</span>
                <Field
                  className={s.input}
                  type="text"
                  name="name"
                  autoFocus
                  placeholder="Вкажіть Ім'я"
                />
                <ErrorMessage name="name" component="div" className={s.error} />
              </label>
              <label className={s.label}>
                <span>Number</span>
                <Field
                  className={s.input}
                  type="text"
                  name="number"
                  placeholder="Тільки цифри"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className={s.error}
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default ContactList; // import { useSelector } from "react-redux";
// import Contact from "../Contact/Contact";
// import s from "./ContactList.module.css";
// import { selectFilteredContacts } from "../../redux/contacts/selectors";

// const ContactList = () => {
//   const contacts = useSelector(selectFilteredContacts);

//   return (
//     <div className={s.wrapper}>
//       <ul className={s.card}>
//         {contacts.map((contact) => (
//           <Contact key={contact.id} {...contact} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ContactList;
