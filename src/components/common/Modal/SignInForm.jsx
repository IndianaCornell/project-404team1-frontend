import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authOperations";
import { showNotification } from "@/redux/slices/notificationsSlice";
import eye from "@/assets/icons/eye.svg";
import eyeOff from "@/assets/icons/eyeOff.svg";
import "@/styles/auth-forms.css";

const Schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignInForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      dispatch(
        showNotification({ type: "success", message: "Signed in successfully" })
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
      initialValues={{ email: "", password: "" }}
      validationSchema={Schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="auth-form">
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
                autoComplete="current-password"
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
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
}
