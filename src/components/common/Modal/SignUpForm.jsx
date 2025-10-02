import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/slices/authOperations";
import { showNotification } from "@/redux/slices/notificationsSlice";
import eye from "@/assets/icons/eye.svg";
import eyeOff from "@/assets/icons/eyeOff.svg";
import "@/styles/auth-forms.css";

const Schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function SignUpForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      dispatch(
        showNotification({ type: "success", message: "Account created" })
      );
      onSuccess();
    } catch (err) {
      dispatch(showNotification({ type: "error", message: String(err) }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="auth-form">
          <label>
            Name
            <Field name="name" autoComplete="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </label>

          <label>
            Email
            <Field type="email" name="email" autoComplete="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </label>

          <label>
            Password
            <div className="password-wrapper">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? eyeOff : eye}
                  alt="eye icon"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="error" />
          </label>

          <button
            type="submit"
            className="btn btn--primary btn--md"
            disabled={isSubmitting}
          >
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
}
