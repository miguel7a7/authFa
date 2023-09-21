"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function DasboardPages() {
  const { data: session, status } = useSession();
  // console.log(session, status);
  return (
    <div>
      <h2>DasboardPages</h2>
      <pre>
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>

      <button
        className="py-1 px-3 bg-red-700 hover:bg-red-800"
        onClick={() => signOut()}
      >
        cerrar sesion
      </button>
    </div>
  );
}
