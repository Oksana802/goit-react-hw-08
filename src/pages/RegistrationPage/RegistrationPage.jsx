import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import s from "./RegistrationPage.module.css";
import successImage from "../../assets/go-1.png";
import treeImage from "../../assets/tree.jpg";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Required"),
  });
  const handleSubmit = (values, options) => {
    dispatch(register(values))
      .unwrap()
      .then((res) => {
        toast(`${res.user.name} successfully registered`);
        navigate(`/contacts`);
      })
      .catch(() => {
        toast("Register another email");
      });
    options.resetForm();
  };

  return (
    <div className={s.wrapper_r}>
      <div>
        <img className={s.tree} src={treeImage} alt="Сhristmas wreath" />
      </div>
      <div className={s.box_r}>
        <h2>Register</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
            <label className={s.label}>
              <span> Name</span>
              <Field className={s.input} type="text" name="name" />
              <ErrorMessage name="name" component="div" className={s.error} />
            </label>
            <label className={s.label}>
              <span>Email</span>
              <Field className={s.input} type="email" name="email" />
              <ErrorMessage name="email" component="div" className={s.error} />
            </label>
            <label className={s.label}>
              <span>Password</span>
              <Field className={s.input} type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </label>
            <button className={s.btn} type="submit">
              Register
            </button>
          </Form>
        </Formik>
      </div>

      <div className={s.animatedImage}>
        <img src={successImage} alt="Registration successful" />
      </div>
    </div>
  );
};

export default RegistrationPage;
