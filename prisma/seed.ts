import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password_hash = await bcrypt.hash('password123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@aksatech.com' },
    update: {},
    create: {
      email: 'admin@aksatech.com',
      full_name: 'Super Admin',
      password_hash,
      role: Role.ADMIN,
    },
  })

  await prisma.user.upsert({
    where: { email: 'pm@aksatech.com' },
    update: {},
    create: {
      email: 'pm@aksatech.com',
      full_name: 'Project Manager',
      password_hash,
      role: Role.PM,
    },
  })

  await prisma.user.upsert({
    where: { email: 'engineer@aksatech.com' },
    update: {},
    create: {
      email: 'engineer@aksatech.com',
      full_name: 'Engineer Aksa Tech',
      password_hash,
      role: Role.STAFF,
    },
  })

  // Inisialisasi Akun Tamu / Klien per Matra (Role GUEST)
  const defaultGuests = [
    { email: 'guest.au@aksatech.com', full_name: 'Tamu TNI-AU', matra: 'TNI-AU' },
    { email: 'guest.al@aksatech.com', full_name: 'Tamu TNI-AL', matra: 'TNI-AL' },
    { email: 'guest.ad@aksatech.com', full_name: 'Tamu TNI-AD', matra: 'TNI-AD' },
  ]

  for (const guest of defaultGuests) {
    await prisma.user.upsert({
      where: { email: guest.email },
      update: { matra: guest.matra, full_name: guest.full_name },
      create: {
        email: guest.email,
        full_name: guest.full_name,
        password_hash,
        role: Role.GUEST,
        matra: guest.matra,
      },
    })
  }

  // Inisialisasi Titik Geofence Kantor PT Aksa Tech Indonesia
  await prisma.systemSetting.upsert({
    where: { key: 'OFFICE_LATITUDE' },
    update: { value: '-7.877989458768671' },
    create: { key: 'OFFICE_LATITUDE', value: '-7.877989458768671' },
  })
  await prisma.systemSetting.upsert({
    where: { key: 'OFFICE_LONGITUDE' },
    update: { value: '110.31851240674597' },
    create: { key: 'OFFICE_LONGITUDE', value: '110.31851240674597' },
  })
  await prisma.systemSetting.upsert({
    where: { key: 'OFFICE_RADIUS_METERS' },
    update: { value: '100' },
    create: { key: 'OFFICE_RADIUS_METERS', value: '100' },
  })

  // Inisialisasi Armada Drone Matra (Total 52 Unit)
  const initialDrones: Array<{ serial_number: string; model_name: string; matra: string }> = [
    // === TNI-AU (Total 24 Unit) ===
    // FA: FA-6065 s/d FA-6080 (16 unit Model AR)
    { serial_number: 'FA-6065', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6066', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6067', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6068', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6069', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6070', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6071', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6072', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6073', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6074', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6075', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6076', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6077', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6078', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6079', model_name: 'Model AR', matra: 'TNI-AU' },
    { serial_number: 'FA-6080', model_name: 'Model AR', matra: 'TNI-AU' },
    // FT: FT-6085 s/d FT-6092 (8 unit Model TR)
    { serial_number: 'FT-6085', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6086', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6087', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6088', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6089', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6090', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6091', model_name: 'Model TR', matra: 'TNI-AU' },
    { serial_number: 'FT-6092', model_name: 'Model TR', matra: 'TNI-AU' },

    // === TNI-AL (Total 12 Unit) ===
    // FA: FA-6081 s/d FA-6084 (4 unit Model AR)
    { serial_number: 'FA-6081', model_name: 'Model AR', matra: 'TNI-AL' },
    { serial_number: 'FA-6082', model_name: 'Model AR', matra: 'TNI-AL' },
    { serial_number: 'FA-6083', model_name: 'Model AR', matra: 'TNI-AL' },
    { serial_number: 'FA-6084', model_name: 'Model AR', matra: 'TNI-AL' },
    // FR: FR-6109 s/d FR-6112 (4 unit Model Revolver)
    { serial_number: 'FR-6109', model_name: 'Model Revolver', matra: 'TNI-AL' },
    { serial_number: 'FR-6110', model_name: 'Model Revolver', matra: 'TNI-AL' },
    { serial_number: 'FR-6111', model_name: 'Model Revolver', matra: 'TNI-AL' },
    { serial_number: 'FR-6112', model_name: 'Model Revolver', matra: 'TNI-AL' },
    // FT: FT-6097, FT-6101, FT-6103, FT-6107 (4 unit Model TR)
    { serial_number: 'FT-6097', model_name: 'Model TR', matra: 'TNI-AL' },
    { serial_number: 'FT-6101', model_name: 'Model TR', matra: 'TNI-AL' },
    { serial_number: 'FT-6103', model_name: 'Model TR', matra: 'TNI-AL' },
    { serial_number: 'FT-6107', model_name: 'Model TR', matra: 'TNI-AL' },

    // === TNI-AD (Total 16 Unit) ===
    // FR: FR-6113 s/d FR-6116 (4 unit Model Revolver)
    { serial_number: 'FR-6113', model_name: 'Model Revolver', matra: 'TNI-AD' },
    { serial_number: 'FR-6114', model_name: 'Model Revolver', matra: 'TNI-AD' },
    { serial_number: 'FR-6115', model_name: 'Model Revolver', matra: 'TNI-AD' },
    { serial_number: 'FR-6116', model_name: 'Model Revolver', matra: 'TNI-AD' },
    // FT: FT-6093 s/d FT-6096, FT-6098 s/d FT-6100, FT-6102, FT-6104 s/d FT-6106, FT-6108 (12 unit Model TR)
    { serial_number: 'FT-6093', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6094', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6095', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6096', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6098', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6099', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6100', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6102', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6104', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6105', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6106', model_name: 'Model TR', matra: 'TNI-AD' },
    { serial_number: 'FT-6108', model_name: 'Model TR', matra: 'TNI-AD' },
  ]

  for (const drone of initialDrones) {
    await prisma.drone.upsert({
      where: { serial_number: drone.serial_number },
      update: { 
        model_name: drone.model_name,
        matra: drone.matra,
      },
      create: {
        serial_number: drone.serial_number,
        model_name: drone.model_name,
        matra: drone.matra,
        status: 'READY',
      },
    })
  }

  console.log('Seeding completed: Default Users, Matra Guests, Office Geofence, and 52 Drones initialized.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
