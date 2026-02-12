import { Router } from 'express';
import qrController from './qr.controller';
import { authenticate, authorize } from '../auth/auth.middleware';

const router = Router();

/**
 * @route   GET /api/qr/:productId
 * @desc    Generate QR code for a product
 * @access  Private (Manufacturer, Admin)
 */
router.get(
  '/:productId',
  authenticate,
  authorize('manufacturer', 'admin'),
  qrController.generateQR
);

/**
 * @route   POST /api/qr/verify
 * @desc    Verify QR code
 * @access  Public
 */
router.post('/verify', qrController.verifyQR);

export default router;
