import { Storage } from "aws-amplify";

/**
 * 1. The user selects a file to upload.
 * 2. The file is uploaded to S3 under the user’s folder and we get a key back.
 * 3. Create a note with the file key as the attachment.
 * */
export async function s3Upload(file) {
  // May not be best way to create unique file name
  const filename = `${Date.now()}-${file.name}`;
  // Storage.vault.put to upload to user's folder
  // Storage.put to directly upload publicly
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}