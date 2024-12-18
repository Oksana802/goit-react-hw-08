import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Required"),
  });
  const handleSubmit = (values, options) => {
    dispatch(login(values));
    options.resetForm();
  };
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  return (
    <div className={s.wrapper}>
      <div className={s.box}>
        <h2>Login</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <label className={s.label}>
              Email
              <Field className={s.input} type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </label>
            <label className={s.label}>
              Password
              <Field className={s.input} type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </label>
            <button className={s.btn} type="submit">
              Log in
            </button>
          </Form>
        </Formik>
      </div>
      <p>Who is first in line?</p>
    </div>
  );
};

export default LoginPage;
