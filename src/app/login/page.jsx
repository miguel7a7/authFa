"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [formValues, setFormValues] = useState({
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
      const resauth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (resauth?.error) return setError(resauth.error);

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
      {error && <div>{error}</div>}
      <form
        className="flex flex-col gap-3 w-3/12 px-8 py-10 bg-neutral-950 rounded-md"
        onSubmit={handleSubmit}
      >
        <h3 className="uppercase font-bold">Inicia Sesión</h3>
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
          className=" inline px-3 py-2 mt-3 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Iniciar sesion
        </button>
      </form>
    </div>
  );
}
