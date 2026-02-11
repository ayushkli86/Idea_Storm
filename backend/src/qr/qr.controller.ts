import { Response, NextFunction } from 'express';
import { AuthRequest } from '../auth/auth.middleware';
import qrService from '../services/qr.service';
import databaseService from '../services/database.service';
import blockchainService from '../services/blockchain.service';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

class QRController {
  /**
   * Generate QR code for a medicine product
   */
  async generateQR(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      // Verify product exists
      const medicine = await databaseService.getMedicineByProductId(productId);
      if (!medicine) {
        throw new AppError('Product not found', 404);
      }

      // Create QR payload
      const qrPayload = await qrService.createQRPayload(productId);

      // Store QR record
      await databaseService.storeQRRecord(
        qrPayload.qrHash,
        productId,
        qrPayload.expiresAt
      );

      // Register on blockchain
      await blockchainService.registerQRHash(qrPayload.qrHash, productId);

      // Generate QR image
      const qrImage = await qrService.generateQRImage(qrPayload);

      logger.info(`QR generated for product: ${productId}`);

      res.json({
        message: 'QR code generated successfully',
        qrCode: qrImage,
        expiresAt: qrPayload.expiresAt
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify QR code
   */
  async verifyQR(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { qrData } = req.body;

      if (!qrData) {
        throw new AppError('QR data required', 400);
      }

      // Parse QR data
      const parsed = qrService.parseQRData(qrData);

      // Check if expired
      if (qrService.isQRExpired(parsed.timestamp)) {
        throw new AppError('QR code expired', 400);
      }

      // Get QR record from database
      const qrRecord = await databaseService.getQRRecord(parsed.qrHash);
      if (!qrRecord) {
        throw new AppError('Invalid QR code', 400);
      }

      // Check if already used
      if (qrRecord.used) {
        throw new AppError('QR code already used', 400);
      }

      // Verify on blockchain
      const isValidOnChain = await blockchainService.verifyQRHash(parsed.qrHash);
      if (!isValidOnChain) {
        throw new AppError('QR code not verified on blockchain', 400);
      }

      // Get medicine details
      const medicine = await databaseService.getMedicineByProductId(parsed.productId);

      // Mark QR as used
      await databaseService.markQRAsUsed(parsed.qrHash);

      // Log verification
      await databaseService.logVerification({
        product_id: parsed.productId,
        is_valid: true,
        verified_at: new Date().toISOString(),
        ip_address: req.ip,
        metadata: { qrHash: parsed.qrHash }
      });

      logger.info(`QR verified for product: ${parsed.productId}`);

      res.json({
        isValid: true,
        message: 'QR code verified successfully',
        medicine
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new QRController();
