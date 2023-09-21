"use client";
// import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  // esto solo para modo backend => verificar si existe un usuario
  // const session = await getServerSession();
  const { data: session } = useSession();

  return (
    <nav className="bg-zinc-900 h-[4rem] px-5">
      <div className="container mx-auto h-[4rem] flex justify-between items-center">
        <Link href="/" className="text-2xl">
          NextAuth
        </Link>

        <ul className="flex gap-3">
          {session ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="py-1 px-2 bg-red-500 hover:bg-red-800 rounded-md"
                  onClick={() => signOut()}
                >
                  Cerrar sesion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
