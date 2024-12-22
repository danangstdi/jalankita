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

    const session = await cookies();
    session.set({
      name: 'jalankita_auth_adminId',
      value: getIdFromDb.adminId,
      sameSite: "strict",
      path: '/',
    })
    session.set({
      name: 'jalankita_auth_level',
      value: getIdFromDb.level,
      sameSite: "strict",
      path: '/',
    })
    session.set({
      name: 'jalankita_auth_access',
      value: getIdFromDb.access,
      sameSite: "strict",
      path: '/',
    })

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil masuk ke sistem",
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
        message: "Gagal masuk ke sistem",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
