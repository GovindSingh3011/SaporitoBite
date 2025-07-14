const cloudinary = require('../config/cloudinary');

// Extract public ID from Cloudinary URL
const extractPublicId = (imageUrl) => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
        return null;
    }

    // Extract public ID from URL
    // Example URL: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/spoonsage/recipes/abc123.jpg
    const parts = imageUrl.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');

    if (uploadIndex === -1) return null;

    // Get everything after 'upload/v{version}/'
    const pathAfterVersion = parts.slice(uploadIndex + 2).join('/');

    // Remove file extension
    const publicId = pathAfterVersion.replace(/\.[^/.]+$/, '');

    return publicId;
};

// Delete image from Cloudinary
const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        const publicId = extractPublicId(imageUrl);

        if (!publicId) {
            console.log('No valid public ID found for image deletion');
            return { success: false, message: 'Invalid image URL' };
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            console.log(`Image deleted successfully: ${publicId}`);
            return { success: true, message: 'Image deleted successfully' };
        } else {
            console.log(`Failed to delete image: ${publicId}`, result);
            return { success: false, message: 'Failed to delete image' };
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return { success: false, message: 'Error deleting image', error: error.message };
    }
};

module.exports = {
    extractPublicId,
    deleteImageFromCloudinary
};