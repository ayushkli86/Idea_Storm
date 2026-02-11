# Setup Guide - Counterfeit Medicine Blockchain

## Prerequisites Installation

### 1. Install Node.js (Required)

**Windows:**
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (recommended)
3. Run the installer (.msi file)
4. Follow installation wizard (keep default settings)
5. Restart your terminal/IDE

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Install Git (If not already installed)
- Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Install with default settings

## Project Setup

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

**Expected packages to be installed:**
- React 18
- React Router DOM
- Vite
- TypeScript
- Tailwind CSS
- Supabase client
- ethers.js (for blockchain)
- qrcode
- Radix UI components
- And more...

### Step 2: Install Blockchain Dependencies

```bash
cd blockchain
npm install
```

**Expected packages:**
- Hardhat
- ethers.js
- OpenZeppelin contracts
- Hardhat toolbox

### Step 3: Setup Environment Variables

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` file and add your credentials:
```env
# Frontend Environment Variables
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTRACT_ADDRESS=deployed_contract_address

# Blockchain Environment Variables (for deployment)
PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_api_key
```

### Step 4: Setup Supabase (Optional - for database features)

1. Go to [https://supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Get your project URL and anon key from Settings > API
5. Add them to your `.env` file

### Step 5: Setup MetaMask (For blockchain features)

1. Install MetaMask browser extension
2. Create or import a wallet
3. Switch to a test network (Sepolia recommended)
4. Get test ETH from a faucet

## Running the Project

### Option 1: Run Frontend Only (Recommended for start)

```bash
cd frontend
npm run dev
```

The app will open at `http://localhost:5173`

### Option 2: Run Blockchain Local Node

In a separate terminal:
```bash
cd blockchain
npm run node
```

Then deploy contracts:
```bash
cd blockchain
npm run deploy
```

### Option 3: Run Everything

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Blockchain:**
```bash
cd blockchain
npm run node
```

**Terminal 3 - Deploy Contracts:**
```bash
cd blockchain
npm run deploy
```

## Testing

### Test Frontend
```bash
cd frontend
npm test
```

### Test Smart Contracts
```bash
cd blockchain
npm test
```

## Build for Production

### Build Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Compile Smart Contracts
```bash
cd blockchain
npm run compile
```

## Troubleshooting

### Issue: "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart terminal after installing Node.js
- Reinstall Node.js if needed

### Issue: "Module not found"
- Run `npm install` in the respective directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue: "Port already in use"
- Frontend default port: 5173
- Change port in `vite.config.ts` if needed
- Or kill the process using that port

### Issue: Supabase connection error
- Check your `.env` file has correct credentials
- Verify Supabase project is active
- Check network connection

### Issue: MetaMask not connecting
- Make sure MetaMask is installed
- Check you're on the correct network
- Refresh the page

## Project Structure

```
counterfeit-medicine-blockchain/
├── frontend/          # React application
├── blockchain/        # Smart contracts
├── backend/           # Future API (not implemented yet)
├── supabase/          # Database config
└── docs/              # Documentation
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Install frontend dependencies
3. ✅ Run frontend dev server
4. ⏳ Setup Supabase (optional)
5. ⏳ Setup blockchain (optional)
6. ⏳ Connect MetaMask (optional)

## Useful Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm test             # Run tests
npm run preview      # Preview production build

# Blockchain
npm run compile      # Compile contracts
npm run test         # Test contracts
npm run deploy       # Deploy contracts
npm run node         # Start local blockchain
```

## Support

For issues or questions:
- Check the README.md
- Review error messages carefully
- Ensure all dependencies are installed
- Verify environment variables are set correctly
