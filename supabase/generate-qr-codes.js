import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

const supabaseUrl = 'https://bshvpxzkezzxgfewbzax.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzaHZweHprZXp6eGdmZXdiemF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTQyNTksImV4cCI6MjA4NjM5MDI1OX0.g7Pu4-fQyNC9AWawzyr9Fs7KHPUmWgP60QWKLfBkypE'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function generateQRCodes() {
  console.log('🔍 Fetching medicine data from Supabase...')

  // Fetch medicine records with transaction hashes
  const { data: medicines, error } = await supabase
    .from('medicine')
    .select('*')
    .not('transaction_hash', 'is', null)
    .gte('Serial Number (unique)', 'SN200000')
    .lte('Serial Number (unique)', 'SN200020')
    .order('Serial Number (unique)')

  if (error) {
    console.error('❌ Error fetching data:', error)
    return
  }

  if (!medicines || medicines.length === 0) {
    console.error('❌ No medicine records found with transaction hashes')
    return
  }

  console.log(`✅ Found ${medicines.length} medicine records`)

  // Create qr-codes directory if it doesn't exist
  const qrDir = path.join(process.cwd(), 'qr-codes')
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true })
  }

  console.log('\n📦 Generating QR codes...\n')

  let successCount = 0
  let errorCount = 0

  for (const medicine of medicines) {
    try {
      // Create QR code data object
      const qrData = {
        medicine_name: medicine['Medicine Name'],
        batch_number: medicine['Batch Number'],
        manufacturer_id: medicine['Manufacturer ID'],
        manufacturing_date: medicine['Manufacturing Date'],
        expiry_date: medicine['Expiry Date'],
        serial_number: medicine['Serial Number (unique)'],
        transaction_hash: medicine.transaction_hash,
        network: 'polygon'
      }

      // Convert to JSON string
      const qrContent = JSON.stringify(qrData, null, 2)

      // Generate QR code
      const serialNumber = medicine['Serial Number (unique)']
      const fileName = `${serialNumber}.png`
      const filePath = path.join(qrDir, fileName)

      await QRCode.toFile(filePath, qrContent, {
        errorCorrectionLevel: 'H',
        type: 'png',
        width: 500,
        margin: 2
      })

      console.log(`✅ Generated QR code: ${fileName}`)
      successCount++

      // Also save JSON file for reference
      const jsonFileName = `${serialNumber}.json`
      const jsonFilePath = path.join(qrDir, jsonFileName)
      fs.writeFileSync(jsonFilePath, qrContent, 'utf8')

    } catch (err) {
      console.error(`❌ Error generating QR for ${medicine['Serial Number (unique)']}:`, err.message)
      errorCount++
    }
  }

  console.log('\n=== QR Code Generation Summary ===')
  console.log(`✅ Successfully generated: ${successCount}`)
  console.log(`❌ Failed: ${errorCount}`)
  console.log(`📁 QR codes saved in: ${qrDir}`)
}

generateQRCodes()
