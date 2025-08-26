# User Dashboard Frontend (React + Ant Design)

## Setup
```bash
npm install
cp .env.example .env   # set REACT_APP_API_BASE_URL
npm start
```

## Deployment

### Prerequisites
- Ensure you have Node.js and npm installed.
- Install a deployment tool like `serve` or use a hosting platform (e.g., Vercel, Netlify, or AWS S3).

### Build for Production
To create an optimized production build, run:
```bash
npm run build
```
This will generate a `build` folder containing the static files.

### Deploy Locally with `serve`
1. Install `serve` globally:
   ```bash
   npm install -g serve
   ```
2. Serve the production build:
   ```bash
   serve -s build
   ```
3. Open the app in your browser at `http://localhost:3000`.

### Deploy to Hosting Platforms
#### Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy the app:
   ```bash
   vercel
   ```

#### Netlify
1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Deploy the app:
   ```bash
   netlify deploy
   ```
3. Follow the prompts to configure your deployment.

#### AWS S3
1. Upload the contents of the `build` folder to an S3 bucket.
2. Enable static website hosting on the bucket.
3. Access your app via the S3 bucket URL.

---

Feel free to customize these steps based on your preferred deployment platform!
