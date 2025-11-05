const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = async (donor, request) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const fileName = `certificate_${donor.id}_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../certificates', fileName);
      
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      
      doc.pipe(fs.createWriteStream(filePath));
      
      doc.fontSize(24).text('Blood Donation Certificate', 100, 100);
      doc.fontSize(16).text(`This certifies that ${donor.name}`, 100, 150);
      doc.text(`has generously donated blood (${donor.bloodGroup})`, 100, 180);
      doc.text(`for the request in ${request.location}`, 100, 210);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 100, 250);
      doc.text('Thank you for saving lives!', 100, 300);
      
      doc.end();
      
      doc.on('end', () => {
        resolve(`/certificates/${fileName}`);
      });
      
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateCertificate };