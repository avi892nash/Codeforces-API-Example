# Codeforces-api-Example-Basic

API that shows user info in Codeforces

## Development

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This project uses GitHub Actions to automatically build with Vite and deploy to AWS S3.

### Setup GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `S3_BUCKET_NAME` - Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) CloudFront distribution ID for cache invalidation

**Note:** This workflow uses AWS IAM role `arn:aws:iam::532197675314:role/avi89nash_s3_upload` for authentication instead of access keys.

### Deployment Process

The deployment pipeline automatically triggers on:
- Push to `master` branch
- Manual workflow dispatch

The pipeline will:
1. Checkout the code
2. Setup Node.js 20
3. Install dependencies
4. Build the project using Vite
5. Sync the `dist` folder to S3 at `/projects/codeforces-api-example`
6. (Optional) Invalidate CloudFront cache if distribution ID is configured

### S3 Bucket Configuration

Ensure your S3 bucket is configured for static website hosting:
1. Enable static website hosting in S3 bucket settings
2. Set index document to `index.html`
3. Configure bucket policy to allow public read access (if needed)
4. (Optional) Set up CloudFront distribution for CDN
