/**
 * @notice Client-Side Image Compression & EXIF Stripper
 * @dev Resizes proof-of-delivery photos to max ~1280px and renders via in-memory HTML5 Canvas.
 * Canvas re-encoding intrinsically strips all EXIF metadata (GPS, device info, timestamps).
 *
 * @param {File|Blob} file The uploaded image file
 * @param {number} [maxDimension=1280] Maximum width or height
 * @param {number} [quality=0.82] JPEG compression quality (0.0 - 1.0)
 * @return {Promise<Blob>} Sanitized, compressed image blob
 */
export async function compressAndStripExif(file, maxDimension = 1280, quality = 0.82) {
  if (!file) throw new Error('No image file provided');

  // Verify mime type
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Unsupported image format. Please select a JPG or PNG image.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context could not be acquired'));
          return;
        }

        // Draw image onto clean canvas (clears all EXIF tags)
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to encode image blob'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
