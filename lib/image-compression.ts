/**
 * Compresses an image file on the client side using Canvas.
 * @param file The original image file
 * @param maxWidth The maximum width for the compressed image
 * @param quality The quality of the JPEG compression (0.0 to 1.0)
 * @returns A promise that resolves to the compressed Blob
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<File | Blob> {
  // Only compress images
  if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions if necessary
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Blob as JPEG
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Wrap blob back into a File to preserve name
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = (error) => reject(error);
  });
}
