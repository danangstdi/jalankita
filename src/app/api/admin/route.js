import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";

const resetNoEncryptPassword = async () => {
  try {
    const adminsToReset = await prisma.admin.findMany({
      where: {
        level: 'admin',
        noEncryptPassword: {
          not: '',
        }
      }
    });

    if (adminsToReset.length > 0) {
      await prisma.admin.updateMany({
        where: {
          id: { in: adminsToReset.map(admin => admin.id) }
        },
        data: {
          noEncryptPassword: '',
        },
      });
    } else {
      console.log('Terjadi kesalahan pada sistem');
    }
  } catch (error) {
    console.error('Terjadi kesalahan pada sistem:', error.message);
  }
};

// Menggunakan setInterval untuk mengecek waktu setiap menit
setInterval(() => {
  const now = new Date();
  // Mengecek apakah sekarang jam 12 malam
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    resetNoEncryptPassword();
  }
}, 60000);

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

    const checkAdminIdIsTaken = await prisma.admin.findUnique({
      where: {
        adminId: adminId,
      }
    });

    if (checkAdminIdIsTaken) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Terjadi kesalahan pada sistem, coba beberapa menit lagi", 
          error: error.message },
        { 
          status: 500
        }
      );
    }

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

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const session = await cookies();
    const adminIdFromSession = session.get('jalankita_auth_adminId').value;

    const deletedAdmin = await prisma.admin.delete({
      where: {
        id: parseInt(id),
      },
    });

    const sendDataLogAudit = {
      adminId: adminIdFromSession,
      action: `Menghapus admin dengan id:${id}`,
    };
    await fetch("https://jalankita.vercel.app/api/logAudits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataLogAudit),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin berhasil dihapus",
        data: deletedAdmin,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus admin",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request) {
  try {
    const { id } = await request.json();
    const session = await cookies();
    const adminIdFromSession = session.get('jalankita_auth_adminId').value;

    const generateRandomString = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    };

    const password = generateRandomString(8);
    const hashPassword = await bcrypt.hash(password, 10);

    const generateNewPassword = await prisma.admin.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashPassword,
        noEncryptPassword: password,
      },
    });

    const sendDataLogAudit = {
      adminId: adminIdFromSession,
      action: `Memperbarui kata sandi admin dengan id:${id}`,
    };
    await fetch("https://jalankita.vercel.app/api/logAudits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataLogAudit),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kata sandi baru berhasil digenerate",
        data: generateNewPassword,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Kata sandi baru gagal digenerate",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}