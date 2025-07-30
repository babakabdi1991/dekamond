import * as yup from "yup";
import { FORM_FIELDS } from "./constants";

export const schema = yup.object().shape({
  [FORM_FIELDS.PHONE]: yup
    .string()
    .required("Phone number is required")
    .matches(/^09\d{9}$/, "Incorrect phone number"),
  [FORM_FIELDS.PASSWORD]: yup.string().required("Password is required"),
});
