import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../../prisma/client";
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { adminId, password } = await request.json();

    const getIdFromDb = await prisma.admin.findUnique({
      where: {
        adminId: adminId,
      },
    });

    if (!getIdFromDb) {
      return NextResponse.json(
        {
          success: false,
          message: "ID Tidak Ditemukan",
        },
        { status: 404 }
      );
    }

    const PasswordValidation = await bcrypt.compare(password, getIdFromDb.password);
    if (!PasswordValidation) {
      return NextResponse.json(
        {
          success: false,
          message: "Kata Sandi Salah",
        },
        { status: 401 }
      );
    }

    const cookieValue = JSON.stringify({
      adminId: getIdFromDb.adminId,
      level: getIdFromDb.level,
      access: getIdFromDb.access,
    });
    cookies().set('jalankita_auth_session_key', cookieValue, {
      // httpOnly: true,
      // secure: true,
      sameSite: "strict",
      path: "/",
      // maxAge: 60 * 60 * 24,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Login Berhasil",
        data: { 
          adminId: getIdFromDb.adminId,
          level: getIdFromDb.level,
          access: getIdFromDb.access
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Auth Failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
