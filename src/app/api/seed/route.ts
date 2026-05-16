import { connectDB } from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { uploadImage } from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

const IMAGE_MAP: Record<string, string[]> = {
  'service_material_1778761584582.png': [
    'HR/HRPO & CR CTL Sheets',
    'Galvanized Steel Coils',
    'Carbon Steel Plates HR',
  ],
  'service_power_1778761289382.png': [
    'Eicher Jumbo Front Plates 6MM',
    'Heavy Duty Flanges MS',
    'Power Press Components',
  ],
  'service_mechanical_1778761074973.png': [
    'Leyland Front Engine Plates',
    'Precision Shaft Components',
    'Mechanical Seal Housings',
  ],
  'service_chemical_1778761046335.png': [
    'Metacon Engine Mounting Plate',
    'Chemical Resistant Liners',
    'Industrial Bearing Housings',
  ],
  'hero_bg_1778760928163.png': [
    'Cabin 4018 Mounting Plates',
    'Structural Steel Supports',
  ],
  'media__1778760417375.png': [
    'Custom Fabricated Brackets',
    'Hydraulic Cylinder Parts',
  ],
  'media__1778760417409.png': [
    'Tata Ace Gear Box Plates',
    'Transmission Mounting Kits',
  ],
  'media__1778760417430.png': [
    'Chassis Reinforcement Plates',
    'Axle Mounting Assemblies',
  ],
  'media__1778760417507.png': [
    'Radiator Support Brackets',
    'Engine Bay Mounting Rails',
  ],
  'media__1778760417516.png': [
    'Suspension Mounting Plates',
    'Frame Cross Members',
  ],
  'about_worker_1778760981240.png': [
    'Fabricated Base Plates',
    'Custom CNC Machined Parts',
  ],
};

export async function POST() {
  try {
    await connectDB();

    const existing = await Product.countDocuments();
    if (existing > 0) {
      await Product.deleteMany({});
    }

    const imagesDir = path.join(process.cwd(), 'public/images');
    const allProducts: { title: string; src: string }[] = [];

    for (const [filename, titles] of Object.entries(IMAGE_MAP)) {
      const filePath = path.join(imagesDir, filename);

      if (!fs.existsSync(filePath)) {
        console.warn(`Image not found: ${filename}, skipping...`);
        continue;
      }

      const buffer = fs.readFileSync(filePath);

      const cloudinaryUrl = await uploadImage(buffer);

      for (const title of titles) {
        allProducts.push({ title, src: cloudinaryUrl });
      }
    }

    const created = await Product.insertMany(allProducts);

    return Response.json({
      success: true,
      message: `Seeded ${created.length} products`,
      products: created.map((p) => ({ _id: p._id, title: p.title })),
    });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
