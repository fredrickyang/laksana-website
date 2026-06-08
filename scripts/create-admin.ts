import 'dotenv/config';
import { getPayload } from 'payload';
import config from '../payload.config';

async function createAdmin() {
  const email = process.argv[2] || 'admin_new@laksanabusinesspark.id';
  const password = process.argv[3] || 'LaksanaAdminSecure2026!';

  console.log(`Initializing Payload...`);
  try {
    const payload = await getPayload({ config });
    
    console.log(`Checking if user ${email} already exists...`);
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`User ${email} already exists. Updating password...`);
      const updated = await payload.update({
        collection: 'users',
        id: existing.docs[0].id,
        data: {
          password,
          role: 'admin',
        },
      });
      console.log(`Success! Password updated for user ID: ${updated.id}`);
    } else {
      console.log(`Creating new admin user: ${email}...`);
      const user = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'admin',
        },
      });
      console.log(`Success! Admin user created with ID: ${user.id}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

createAdmin();
