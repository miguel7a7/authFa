"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    fullname: "miguel",
    email: "miguel@gmail.com",
    password: "12345",
  });
  const { fullname, email, password } = formValues;

  const handleInput = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  // Envio de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.message);
      }
      setError(data.message);

      const resauth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resauth?.ok) return router.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-4rem)]">
      <form
        className="flex flex-col gap-3 w-3/12 px-8 py-10 bg-neutral-950 rounded-md"
        onSubmit={handleSubmit}
      >
        {error && <div>{error}</div>}
        <h3>REGISTRAR USUARIO</h3>
        <input
          autoFocus
          autoComplete="off"
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Ej. Nombre completo"
          className="px-3 py-2 rounded-md"
          value={fullname}
          onChange={handleInput}
        />
        <input
          autoFocus
          autoComplete="off"
          type="email"
          name="email"
          id="email"
          placeholder="Ej. prueba@gmail.com"
          className="px-3 py-2 rounded-md"
          value={email}
          onChange={handleInput}
        />
        <input
          autoFocus
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          placeholder="*****"
          className="px-3 py-2 rounded-md"
          value={password}
          onChange={handleInput}
        />

        <button
          type="submit"
          className="inline px-3 py-2 mt-3 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
