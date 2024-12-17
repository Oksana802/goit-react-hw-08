import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    <div>
      <h2>Register</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <label>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </label>
          <label>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </label>
          <label>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </label>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
