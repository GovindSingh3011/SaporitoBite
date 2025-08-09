const cloudinary = require('../config/cloudinary');

// Extract public ID from Cloudinary URL
const extractPublicId = (imageUrl) => {
    try {
        // Extract public ID from Cloudinary URL
        // Example URL: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/SaporitoBite/recipes/abc123.jpg
        const parts = imageUrl.split('/');
        const uploadIndex = parts.indexOf('upload');

        if (uploadIndex !== -1 && uploadIndex < parts.length - 1) {
            // Get everything after 'upload' and version (if present)
            let publicIdParts = parts.slice(uploadIndex + 1);

            // Remove version if present (starts with 'v' followed by numbers)
            if (publicIdParts[0] && publicIdParts[0].match(/^v\d+$/)) {
                publicIdParts = publicIdParts.slice(1);
            }

            // Join the remaining parts and remove file extension
            const publicId = publicIdParts.join('/').replace(/\.[^/.]+$/, '');
            return publicId;
        }

        return null;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
};

const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl) {
            return {
                success: false,
                message: 'No image URL provided'
            };
        }

        const publicId = extractPublicId(imageUrl);

        if (!publicId) {
            return {
                success: false,
                message: 'Could not extract public ID from image URL'
            };
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return {
                success: true,
                message: 'Image deleted successfully from Cloudinary'
            };
        } else {
            return {
                success: false,
                message: `Failed to delete image: ${result.result}`
            };
        }
    } catch (error) {
        console.error('Cloudinary deletion error:', error);
        return {
            success: false,
            message: error.message
        };
    }
};

module.exports = {
    extractPublicId,
    deleteImageFromCloudinary
};