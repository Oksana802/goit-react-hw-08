import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.css";
import friends from "../../assets/ncontact.jpg";
import toast from "react-hot-toast";

const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate(`/contacts`);
      })
      .catch(() => {
        toast("try another email");
      });
    options.resetForm();
  };
  if (isLoggedIn) {
    return <Navigate to="/contacts" />;
  }
  return (
    <div className={s.wrapper_l}>
      <div className={s.box_log}>
        <h2>Login</h2>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className={s.form}>
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
              Log in
            </button>
          </Form>
        </Formik>
      </div>
      <p className={s.text}>
        Who's the first on your list to connect with today? Let's get started
        and make it happen!
      </p>
      <img src={friends} alt="Santa and his friends" />
    </div>
  );
};

export default LoginPage;
