"use client";

import Loading from "../_common/components/loading/Loading";
import Image from "next/image";
import { useCheckLogin } from "./hooks/useCheckLogin";

export default function DashboardPage() {
  const { user, isLoading } = useCheckLogin();

  if (isLoading || !user) {
    return <Loading text="Loading user data..." />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Dashboard!</h1>
      <p>You are now logged in.</p>
      <div style={{ marginTop: "2rem" }}>
        <h2>User Info:</h2>
        <p>
          <strong>Name:</strong> {user.name.first} {user.name.last}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <Image
          width={150}
          height={150}
          src={user.picture.large}
          alt="User"
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
