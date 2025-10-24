const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  pattern: "removebg",
  alias: ["rmbg", "nobg", "transparentbg"],
  react: '🖼️',
  desc: "Remove background from an image",
  category: "utility",
  use: ".removebg [reply to image]",
  filename: __filename
}, async (client, message, { reply, quoted }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = quoted || message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      return reply("Please reply to an image file (JPEG/PNG)");
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    
    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else {
      return reply("Unsupported image format. Please use JPEG or PNG");
    }

    // Create temp file
    const tempFilePath = path.join(os.tmpdir(), `removebg_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Upload to Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `image${extension}`);
    form.append('reqtype', 'fileupload');

    const uploadResponse = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const imageUrl = uploadResponse.data;
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (!imageUrl) {
      throw "Failed to upload image to Catbox";
    }

    // Remove background using API
    const apiUrl = `https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    // Check if response is valid image
    if (!response.data || response.data.length < 100) { // Minimum size check
      throw "API returned invalid image data";
    }

    // Save processed image
    const outputPath = path.join(os.tmpdir(), `removebg_output_${Date.now()}.png`);
    fs.writeFileSync(outputPath, response.data);

    // Send the processed image
    await client.sendMessage(message.chat, {
      image: fs.readFileSync(outputPath),
      caption: "Background removed successfully!",
    }, { quoted: message });

    // Clean up
    fs.unlinkSync(outputPath);

  } catch (error) {
    console.error('RemoveBG Error:', error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});
