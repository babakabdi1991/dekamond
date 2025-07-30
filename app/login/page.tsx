"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import styles from "./login.module.scss";
import type { FormFields } from "./types";
import Input from "../_common/components/input/Input";
import Button from "../_common/components/button/Button";
import { schema } from "./validation";
import { translation } from "./translation";
import { useFetchData } from "../_common/hooks/useFetchData";
import { FORM_FIELDS, USER_URL } from "./constants";
import { APP_PATH, STATIC_CACHE_NAMES } from "../_common/constants";
import { User } from "../_common/types";

export default function LoginPage() {
  const router = useRouter();
  const { loading, fetchData } = useFetchData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    console.log("not used data:(validation in yup and react hook form)", data);
    await fetchData<{ results: User[] }>(USER_URL).then((user) => {
      localStorage.setItem(STATIC_CACHE_NAMES.USER, JSON.stringify(user));
      router.push(APP_PATH.DASHBOARD);
    });
  };

  const error = errors.phone?.message || errors.password?.message;

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>{translation.login}</h2>
        <Input
          {...register(FORM_FIELDS.PHONE)}
          name={FORM_FIELDS.PHONE}
          placeholder="09xxxxxxxxx"
          error={errors.phone?.message}
          autoComplete="tel"
          disabled={loading}
        />
        <Input
          type={FORM_FIELDS.PASSWORD}
          {...register(FORM_FIELDS.PASSWORD)}
          placeholder={FORM_FIELDS.PASSWORD}
          error={errors.password?.message}
          autoComplete="current-password"
          disabled={loading}
        />
        {error && (
          <div className={styles.error}>{translation.errorMessage}</div>
        )}
        <Button type="submit" disabled={loading}>
          {translation.buttonLogin(loading)}
        </Button>
      </form>
    </div>
  );
}
