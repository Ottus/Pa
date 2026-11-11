/**
 * @notice Initial Firestore Data Seeder
 * @dev Seeds settings/pricing per blueprint specification.
 * Usage: node scripts/seed-demo-data.js
 */
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');

// Check emulator vs service account
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({ projectId: 'parcelo-dev' });
} else if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id || 'parcelo-dev',
  });
} else {
  console.log('[Notice] No service-account.json found and FIRESTORE_EMULATOR_HOST is not set.');
  console.log('Using local default project initialization.');
  admin.initializeApp({ projectId: 'parcelo-dev' });
}

const db = admin.firestore();

async function seedSettings() {
  console.log('Seeding settings/pricing document...');
  await db.collection('settings').doc('pricing').set({
    baseFee: 1500,
    perKm: 120,
    perKg: 100,
    sizeFactors: {
      small: 1.0,
      medium: 1.2,
      large: 1.5,
    },
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('[SUCCESS] settings/pricing seeded: baseFee 1500, perKm 120, perKg 100, sizes: small 1.0, medium 1.2, large 1.5');
}

seedSettings().catch((err) => {
  console.error('[Error] Seeding failed:', err.message);
});

