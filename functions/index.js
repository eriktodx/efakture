const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.accountTransfer = functions
  .region('europe-west3')
  .https
  .onRequest(async (req, res) => {
    const from = req.query.from;  // source account UID
    const to = req.query.to;      // destination account UID

    if (!from || !to) {
      throw new Error('Invalid request parameters!');
    }

    console.log(`Account transfer request received. ${from} -> ${to}`);

    const firestore = admin.firestore();

    const collections = [
      'clients',
      'invoices',
      'items',
      'notes',
    ];

    for (const collectionName of collections) {
      console.log(`Processing collection ${collectionName}...`);
      const snapshot = await firestore.collection(collectionName)
        .where('userId', '==', from)
        .get();
      const promises = [];
      snapshot.forEach(document => {
        console.log(`Updating document ${collectionName} -> ${document.id}...`);
        const promise = document.ref.update({
          userId: to
        }).then(() => {
          console.log(`Finished updating document ${collectionName} -> ${document.id}!`);
        });
        promises.push(promise);
      });
      await Promise.all(promises);
      console.log(`Finished processing collection ${collectionName}!`);
    }

    res.status(200).send();
  });

const key = require('./service-key.json');
const {google} = require('googleapis');

const authClient = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ["https://www.googleapis.com/auth/datastore", "https://www.googleapis.com/auth/cloud-platform"]
});

const firestoreClient = google.firestore({
  version: "v1beta2",
  auth: authClient
});

exports.backupFirestore = functions
  .region('europe-west3')
  .pubsub
  .schedule('every day 00:00')
  .timeZone('Europe/Ljubljana')
  .onRun(async () => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

    const timestamp = new Date().toISOString();

    console.log(`Start to backup project ${projectId}`);

    await authClient.authorize();
    return firestoreClient.projects.databases.exportDocuments({
      name: `projects/${projectId}/databases/(default)`,
      requestBody: {
        outputUriPrefix: `gs://${projectId}-firestore-backup/backups/${timestamp}`
      }
    });

  });
