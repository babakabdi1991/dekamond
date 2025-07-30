import * as yup from "yup";
import { FORM_FIELDS } from "./constants";

export const schema = yup.object().shape({
    [FORM_FIELDS.PHONE]: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, "Phone number must be 11 digits and start with 09"),
    [FORM_FIELDS.PASSWORD]: yup.string().required("Password is required"),
  });