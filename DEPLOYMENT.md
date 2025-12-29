# Azure Deployment Guide

This guide will walk you through deploying the RedwoodAI Demo to Azure Static Web Apps.

## Prerequisites

- Azure account (free tier available at https://azure.microsoft.com/free/)
- GitHub account
- Azure CLI installed (optional, for CLI deployment)

## Method 1: Deploy via Azure Portal (Recommended for First Time)

### Step 1: Create Azure Static Web App

1. Log in to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web Apps" and select it
4. Click "Create"

### Step 2: Configure Basic Settings

- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing
- **Name**: `redwoodai-demo` (or your preferred name)
- **Plan type**: Free (for development/testing)
- **Region**: Select closest to your users
- **Source**: GitHub
- **GitHub account**: Authorize and select your account

### Step 3: Configure Build Details

- **Organization**: Select your GitHub organization
- **Repository**: `redwoodai-demo`
- **Branch**: `main`
- **Build Presets**: React
- **App location**: `/`
- **Api location**: `` (leave empty for now)
- **Output location**: `dist`

### Step 4: Review and Create

1. Click "Review + Create"
2. Review your settings
3. Click "Create"

Azure will:
- Create the Static Web App resource
- Add a GitHub Actions workflow to your repository
- Trigger the first deployment automatically

### Step 5: View Your Deployment

1. Once created, go to your Static Web App resource
2. Click on "Browse" to view your live application
3. The URL will be: `https://[your-app-name].azurestaticapps.net`

## Method 2: Deploy via Azure CLI

### Prerequisites

Install Azure CLI:
```bash
# macOS
brew install azure-cli

# Windows (with Chocolatey)
choco install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Deployment Steps

1. **Login to Azure**
   ```bash
   az login
   ```

2. **Create Resource Group** (if needed)
   ```bash
   az group create \
     --name redwoodai-rg \
     --location eastus2
   ```

3. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name redwoodai-demo \
     --resource-group redwoodai-rg \
     --source https://github.com/YOUR-USERNAME/redwoodai-demo \
     --location eastus2 \
     --branch main \
     --app-location "/" \
     --output-location "dist" \
     --login-with-github
   ```

4. **Get Deployment Token** (for GitHub Actions)
   ```bash
   az staticwebapp secrets list \
     --name redwoodai-demo \
     --resource-group redwoodai-rg \
     --query "properties.apiKey" \
     --output tsv
   ```

5. **Add Token to GitHub Secrets**
   - Go to your GitHub repository settings
   - Navigate to Secrets → Actions
   - Add new secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Paste the deployment token

## Method 3: Manual Deployment via GitHub Actions

If the workflow wasn't automatically created, you can add it manually:

1. The workflow file already exists at `.github/workflows/azure-static-web-apps.yml`
2. Get your deployment token from Azure Portal:
   - Go to your Static Web App
   - Click on "Manage deployment token"
   - Copy the token
3. Add the token to GitHub Secrets as `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Push to main branch or manually trigger the workflow

## Verifying Deployment

### Check Build Status

1. Go to your GitHub repository
2. Click on "Actions" tab
3. You should see the deployment workflow running
4. Click on the workflow to see detailed logs

### Test Your Application

1. Once deployed, visit your Azure Static Web App URL
2. Test the application:
   - Enter "Moscow" in the location field
   - Click "Assess Resilience"
   - Verify the risk score, metrics, and recommendations display correctly

## Custom Domain (Optional)

### Add Custom Domain

1. Go to your Static Web App in Azure Portal
2. Click on "Custom domains"
3. Click "Add"
4. Enter your custom domain
5. Follow the instructions to add DNS records

### Enable HTTPS

HTTPS is automatically enabled for both default and custom domains.

## Monitoring and Troubleshooting

### View Application Insights

1. Go to your Static Web App in Azure Portal
2. Click on "Application Insights" (if enabled)
3. View metrics, logs, and performance data

### Check Deployment Logs

1. Go to "Environments" in your Static Web App
2. Click on "Production"
3. View deployment history and logs

### Common Issues

**Issue**: Build fails with "Module not found"
- **Solution**: Ensure all dependencies are in `package.json`
- Run `npm install` and verify `package-lock.json` is committed

**Issue**: Blank page after deployment
- **Solution**: Check `base` configuration in `vite.config.ts`
- Verify `output_location` in workflow is set to `dist`

**Issue**: GitHub Actions workflow not running
- **Solution**: Check if `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set
- Verify workflow file is in `.github/workflows/` directory

## Environment Variables (Future)

When you add backend APIs, you can configure environment variables:

1. Go to your Static Web App in Azure Portal
2. Click on "Configuration"
3. Add application settings (environment variables)
4. Restart the application

## Cost Management

The Free tier includes:
- 100 GB bandwidth per subscription per month
- 0.5 GB storage per app
- 2 custom domains per app

Monitor usage:
1. Go to "Cost Management + Billing"
2. View cost analysis and set budgets
3. Set up alerts for cost thresholds

## Cleanup

To delete the deployment:

```bash
# Via Azure CLI
az staticwebapp delete \
  --name redwoodai-demo \
  --resource-group redwoodai-rg

# Delete resource group (removes all resources)
az group delete --name redwoodai-rg
```

Or via Azure Portal:
1. Go to your Static Web App
2. Click "Delete"
3. Confirm deletion

## Next Steps

1. **Add Real Backend**: Implement Azure Functions in the `api/` directory
2. **Configure Monitoring**: Enable Application Insights for production monitoring
3. **Set Up Staging**: Create staging environments for pull request previews
4. **Implement CI/CD**: Enhance the workflow with automated testing
5. **Add Authentication**: Integrate Azure AD or social login providers

## Support

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)

## Additional Resources

- [Azure Static Web Apps Pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/static/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/staticwebapp)
- [Custom Domains Guide](https://docs.microsoft.com/en-us/azure/static-web-apps/custom-domain)
