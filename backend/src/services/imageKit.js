import ImageKit, { toFile } from '@imagekit/nodejs';


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const uploadFile = async ({ buffer, filename, folder = "" }) => {

  try {
    const file = await client.files.upload({
      file: await toFile(buffer, filename),
      fileName: filename,
      folder
    });

    return file
  }
  catch (error) {
    console.log(`ImageKit upload failed: ${error.message}`);
  }
}

export default uploadFile