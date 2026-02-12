import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bshvpxzkezzxgfewbzax.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaHZweHprZXp6eGdmZXdiemF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTQyNTksImV4cCI6MjA4NjM5MDI1OX0.g7Pu4-fQyNC9AWawzyr9Fs7KHPUmWgP60QWKLfBkypE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const transactionHashes = [
  { serialNumber: 'SN200000', txHash: '0x9dc141c1fda52623c20bd5fe908d232cdfcfd8ab8b498b8a9fbd118d9dd5dbe5' },
  { serialNumber: 'SN200001', txHash: '0xddaca74b78332c6240f02e60d4bb12a63113ce7f9c9e4e0152d0756e21c9087b' },
  { serialNumber: 'SN200002', txHash: '0x92a43aa4e7742900ca56403e0de50045e1ee593b425903d212520ed807d24e7e' },
  { serialNumber: 'SN200003', txHash: '0x31bf7b4c11c10c5ff2c0290761619ace331f2a49f0675671cc147e0425d3b7bd' },
  { serialNumber: 'SN200004', txHash: '0x4c280ebacb337ebb96f6f81be277f0b42fb5d5df84fc8f069bff3c7800c34484' },
  { serialNumber: 'SN200005', txHash: '0xba262285953278f188109358a5d0ff501586bab2b240fea54bc9c25e74f79510' },
  { serialNumber: 'SN200006', txHash: '0xe2b24e70968e1ba5d5e884b12da8480b7cf255f0ebead09ed46b67b1daa8c1b5' },
  { serialNumber: 'SN200007', txHash: '0x4e40c244acab240ac12e09b7c865fab1827ca209484a83df06ddccefc1a23122' },
  { serialNumber: 'SN200008', txHash: '0xfa01842259938da334e9223aa247627170835296d7e74b2da5f5a8ce1e283d83' },
  { serialNumber: 'SN200009', txHash: '0x9f52fbda42a4fc4345e1cf60f20e3e20641db43bd1182cc433e9967af6abe3f4' },
  { serialNumber: 'SN200010', txHash: '0x4c0a6dee8bfd4f7c57f570223faa879d8d2a87840901618e1a4e9f33b6645fbd' },
  { serialNumber: 'SN200011', txHash: '0x5f14316102cebe50ae8c90604cf94cb06421de13d8e529142d2f4888f081c53d' },
  { serialNumber: 'SN200012', txHash: '0xc7d08b3c5e73a0742462e2d26f93fba19466d2630b77f0d6ac4b3abd5f5e4133' },
  { serialNumber: 'SN200013', txHash: '0xa9187d51f242ffde2f14641381c879e967dcb4c944617fe59fe6a5624e8556d5' },
  { serialNumber: 'SN200014', txHash: '0xb4f44fdbe85307ceff4503172acc81d7289aed4e8d533c1b0931eb020797efee' },
  { serialNumber: 'SN200015', txHash: '0x17791184bad0b274f9cd228fe8faab2bbc8ec8be7942c5be52bbb7c8b5d09956' },
  { serialNumber: 'SN200016', txHash: '0x42b60cfebf01612986d4aa2018866b121f123178290c4729c817966919d9824d' },
  { serialNumber: 'SN200017', txHash: '0xb5f92b31c99c53a6752938ce9ef91255391da440752855c78b0376870326324e' },
  { serialNumber: 'SN200018', txHash: '0x8cb21589ffd26641addd06be15734186be1ebc6523e69b231950ae6f245de3a0' },
  { serialNumber: 'SN200019', txHash: '0xc9c9addd83004f473872e600ab6acc889423e591646044f27f3d57c31e7a6578' },
  { serialNumber: 'SN200020', txHash: '0xa07eec32ea9347a530ea4803bd2b54c024ba4c7706b147d099092339d617ba19' }
]

async function updateTransactionHashes() {
  console.log('Starting transaction hash updates for SN200000-SN200020...')
  console.log(`Total records to update: ${transactionHashes.length}`)

  let successCount = 0
  let errorCount = 0

  for (const record of transactionHashes) {
    try {
      const { data, error } = await supabase
        .from('medicine')
        .update({ transaction_hash: record.txHash })
        .eq('"Serial Number (unique)"', record.serialNumber)

      if (error) {
        console.error(`❌ Error updating ${record.serialNumber}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Updated ${record.serialNumber}`)
        successCount++
      }
    } catch (err) {
      console.error(`❌ Unexpected error for ${record.serialNumber}:`, err)
      errorCount++
    }
  }

  console.log('\n=== Update Summary ===')
  console.log(`✅ Successfully updated: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📊 Total: ${transactionHashes.length}`)
}

updateTransactionHashes()
