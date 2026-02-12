export interface MedicineData {
  productId: string;
  name: string;
  manufacturer: string;
  manufactureDate: number;
  expiryDate: number;
}

export interface BlockchainMedicine extends MedicineData {
  registeredBy: string;
  isVerified: boolean;
}

export interface TransactionResult {
  transactionHash: string;
  blockNumber: number;
  productId?: string;
}

export interface VerificationResult {
  exists: boolean;
  name: string;
  manufacturer: string;
  manufactureDate: number;
  expiryDate: number;
  isVerified: boolean;
}

export interface QRHashRecord {
  qrHash: string;
  productId: string;
  registeredAt: number;
  transactionHash: string;
}

export interface ContractConfig {
  address: string;
  abi: any[];
  rpcUrl: string;
  privateKey: string;
}
