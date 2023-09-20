import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { fullname, password, email } = await req.json();

  const schema = z.object({
    fullname: z
      .string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un string",
      })
      .min(3, { message: "El nombre debe contener al menos 3 caracteres" })
      .max(50, { message: "El nombre debe tener maximo 50 caracteres" }),
    password: z.string({
      required_error: "El password es requerido",
      invalid_type_error: "debe contener letras y numeros como sugerencia",
    }),
    email: z.string().email(),
  });

  // validacion de lo enviado por el form con zod
  const response = schema.safeParse({ fullname, password, email });

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json({
      ok: false,
      message: errors[0].message,
    });
  }
  // ===============================================

  try {
    await connectDB();
    const usuario = await User.findOne({ email });

    if (usuario) {
      return NextResponse.json(
        {
          ok: false,
          message: "El email se encuentra registrado",
        },
        {
          status: 400,
        }
      );
    }

    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      email,
      fullname,
      password: newPassword,
    });

    const saveUser = await user.save();

    return NextResponse.json(saveUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: error.message,
    });
  }
};
