-- Update transaction hashes for SN200000 to SN200020
-- Run this in Supabase SQL Editor

-- First, add the transaction_hash column if it doesn't exist
ALTER TABLE medicine ADD COLUMN IF NOT EXISTS transaction_hash TEXT;

-- Update transaction hashes for each serial number
UPDATE medicine SET transaction_hash = '0x9dc141c1fda52623c20bd5fe908d232cdfcfd8ab8b498b8a9fbd118d9dd5dbe5' WHERE "Serial Number (unique)" = 'SN200000';
UPDATE medicine SET transaction_hash = '0xddaca74b78332c6240f02e60d4bb12a63113ce7f9c9e4e0152d0756e21c9087b' WHERE "Serial Number (unique)" = 'SN200001';
UPDATE medicine SET transaction_hash = '0x92a43aa4e7742900ca56403e0de50045e1ee593b425903d212520ed807d24e7e' WHERE "Serial Number (unique)" = 'SN200002';
UPDATE medicine SET transaction_hash = '0x31bf7b4c11c10c5ff2c0290761619ace331f2a49f0675671cc147e0425d3b7bd' WHERE "Serial Number (unique)" = 'SN200003';
UPDATE medicine SET transaction_hash = '0x4c280ebacb337ebb96f6f81be277f0b42fb5d5df84fc8f069bff3c7800c34484' WHERE "Serial Number (unique)" = 'SN200004';
UPDATE medicine SET transaction_hash = '0xba262285953278f188109358a5d0ff501586bab2b240fea54bc9c25e74f79510' WHERE "Serial Number (unique)" = 'SN200005';
UPDATE medicine SET transaction_hash = '0xe2b24e70968e1ba5d5e884b12da8480b7cf255f0ebead09ed46b67b1daa8c1b5' WHERE "Serial Number (unique)" = 'SN200006';
UPDATE medicine SET transaction_hash = '0x4e40c244acab240ac12e09b7c865fab1827ca209484a83df06ddccefc1a23122' WHERE "Serial Number (unique)" = 'SN200007';
UPDATE medicine SET transaction_hash = '0xfa01842259938da334e9223aa247627170835296d7e74b2da5f5a8ce1e283d83' WHERE "Serial Number (unique)" = 'SN200008';
UPDATE medicine SET transaction_hash = '0x9f52fbda42a4fc4345e1cf60f20e3e20641db43bd1182cc433e9967af6abe3f4' WHERE "Serial Number (unique)" = 'SN200009';
UPDATE medicine SET transaction_hash = '0x4c0a6dee8bfd4f7c57f570223faa879d8d2a87840901618e1a4e9f33b6645fbd' WHERE "Serial Number (unique)" = 'SN200010';
UPDATE medicine SET transaction_hash = '0x5f14316102cebe50ae8c90604cf94cb06421de13d8e529142d2f4888f081c53d' WHERE "Serial Number (unique)" = 'SN200011';
UPDATE medicine SET transaction_hash = '0xc7d08b3c5e73a0742462e2d26f93fba19466d2630b77f0d6ac4b3abd5f5e4133' WHERE "Serial Number (unique)" = 'SN200012';
UPDATE medicine SET transaction_hash = '0xa9187d51f242ffde2f14641381c879e967dcb4c944617fe59fe6a5624e8556d5' WHERE "Serial Number (unique)" = 'SN200013';
UPDATE medicine SET transaction_hash = '0xb4f44fdbe85307ceff4503172acc81d7289aed4e8d533c1b0931eb020797efee' WHERE "Serial Number (unique)" = 'SN200014';
UPDATE medicine SET transaction_hash = '0x17791184bad0b274f9cd228fe8faab2bbc8ec8be7942c5be52bbb7c8b5d09956' WHERE "Serial Number (unique)" = 'SN200015';
UPDATE medicine SET transaction_hash = '0x42b60cfebf01612986d4aa2018866b121f123178290c4729c817966919d9824d' WHERE "Serial Number (unique)" = 'SN200016';
UPDATE medicine SET transaction_hash = '0xb5f92b31c99c53a6752938ce9ef91255391da440752855c78b0376870326324e' WHERE "Serial Number (unique)" = 'SN200017';
UPDATE medicine SET transaction_hash = '0x8cb21589ffd26641addd06be15734186be1ebc6523e69b231950ae6f245de3a0' WHERE "Serial Number (unique)" = 'SN200018';
UPDATE medicine SET transaction_hash = '0xc9c9addd83004f473872e600ab6acc889423e591646044f27f3d57c31e7a6578' WHERE "Serial Number (unique)" = 'SN200019';
UPDATE medicine SET transaction_hash = '0xa07eec32ea9347a530ea4803bd2b54c024ba4c7706b147d099092339d617ba19' WHERE "Serial Number (unique)" = 'SN200020';

-- Verify the updates
SELECT "Serial Number (unique)", "Medicine Name", transaction_hash 
FROM medicine 
WHERE "Serial Number (unique)" BETWEEN 'SN200000' AND 'SN200020'
ORDER BY "Serial Number (unique)";
