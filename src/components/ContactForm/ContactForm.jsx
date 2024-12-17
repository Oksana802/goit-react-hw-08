import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    number: "",
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

  const handleSubmit = (values, options) => {
    dispatch(addContact(values));
    options.resetForm();
  };

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={OrderSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field
              className={s.input}
              type="text"
              name="name"
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
            <ErrorMessage name="number" component="div" className={s.error} />
          </label>
          <button type="submit" className={s.btn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
