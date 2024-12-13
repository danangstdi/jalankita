import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from 'bcryptjs';
// import { cookies } from "next/headers";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      where: {
        level: "admin"
      },
      orderBy: {
        registerAt: 'desc',
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "List Daftar Admin",
        data: admins,
      },
      {
        status: 200,
      }
    );
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch data", 
        error: error.message 
      },
      { 
        status: 500 
      }
  );
  }
}

export async function POST(request) {
  try {
    const { adminId, access, password } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        adminId: adminId,
        level: 'admin',
        access: access,
        password: hashPassword,
        noEncryptPassword: password
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin Created Successfully!",
        data: admin,
      },
      {
        status: 201
      }
    )
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to add admin", 
        error: error.message },
      { 
        status: 500 
      }
    );
  }
}