# Build script for the CMS-enabled Next.js application

Write-Host "Building Second Chance Tails..." -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies first..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Installation failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
}

Write-Host "Creating production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Build failed!" -ForegroundColor Red
    Write-Host "Check the error messages above and fix them." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "This project now requires Node-capable hosting with writable disk access." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment" -ForegroundColor White
Write-Host "  2. Deploy to a Node-capable host (VPS, container, or managed Node hosting)" -ForegroundColor White
Write-Host "  3. Run 'npm run start' on the server after building" -ForegroundColor White
Write-Host "  4. Make sure the server can write to .data and public/uploads" -ForegroundColor White
Write-Host ""
Write-Host "Use 'npm run typecheck' to verify TypeScript locally." -ForegroundColor Cyan
Write-Host ""
