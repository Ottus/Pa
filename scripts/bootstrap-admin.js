/**
 * @notice Admin User Bootstrap Script
 * @dev Securely assigns the custom claim `role: 'admin'` to a specific user UID.
 * Usage: node scripts/bootstrap-admin.js --uid <USER_UID>
 *
 * In accordance with Parcelo Secure Coding Practices:
 * 1. Roles are set exclusively via the Admin SDK `setCustomUserClaims`.
 * 2. Revokes refresh tokens so the user receives a new token with claims immediately.
 */
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
const uidIndex = args.indexOf('--uid');
const targetUid = uidIndex !== -1 ? args[uidIndex + 1] : null;

if (!targetUid) {
  console.error('\n[Error] Missing user UID.');
  console.log('Usage: node scripts/bootstrap-admin.js --uid <FIREBASE_USER_UID>\n');
  process.exit(1);
}

// Locate service account key
const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n[Error] service-account.json not found in project root.');
  console.log('Please download a private key from Firebase Console:');
  console.log('Project Settings > Service accounts > Generate new private key');
  console.log('Save it as "service-account.json" at the root of this project.\n');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function bootstrapAdmin(uid) {
  try {
    console.log(`Setting custom claim { role: 'admin' } for user UID: ${uid}...`);
    
    // 1. Assign custom claim
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });

    // 2. Revoke refresh tokens to force new token issuance with claims
    await admin.auth().revokeRefreshTokens(uid);

    // 3. Update Firestore display role (display copy only)
    const db = admin.firestore();
    await db.collection('users').doc(uid).set({
      role: 'admin',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log(`\n[SUCCESS] User ${uid} is now successfully provisioned as ADMIN.`);
    console.log('Have the user log in or refresh their session in the Ops Dashboard (http://localhost:3001).\n');
  } catch (error) {
    console.error('\n[Failed] Could not bootstrap admin:', error.message);
    process.exit(1);
  }
}

bootstrapAdmin(targetUid);
