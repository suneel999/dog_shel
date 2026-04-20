# Quick Installation Script for Second Chance Tails Website

Write-Host "🐾 Second Chance Tails Website Setup" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Success message
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "The website will be available at:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor Cyan
Write-Host "  - README.md" -ForegroundColor White
Write-Host "  - GETTING_STARTED.md" -ForegroundColor White
Write-Host ""


