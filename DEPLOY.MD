# Deployment Guide

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

# Quickstart: Create an Azure Synapse workspace using an ARM template

This Azure Resource Manager (ARM) template will create an Azure Synapse workspace with underlying Data Lake Storage. The Azure Synapse workspace is a securable collaboration boundary for analytics processes in Azure Synapse Analytics.

[!INCLUDE [About Azure Resource Manager](../../includes/resource-manager-quickstart-introduction.md)]

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.

[![Deploy to Azure 1](../media/template-deployments/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https://raw.githubusercontent.com/Rituranjan123/Traffic-Monitoring-Solution-Accelerator/main/ARMTemplate/ARMTemplate_mspoc_MainResourceGroup.json)


## Step 2. Setup Resources
    * Create a resource group name
    * Create a Storage account
        * Create Container 
        * process video
        * Unprocessed video 
    * Create a Cosmos DB account
    * Create App service
        * HighwayMonitoringWebAPI
        * HighwayMonitoring
    * Create a SQL Server instance or use exciting SQL server instance 
        * Run the follwing script in SQL instance


## Step 3. Set up  configuration appsetting.json in HighwayMonitoringWebAPI

        "ConnectionStrings": {  "XXXXXXXXXXXX" },
        "BlobConnectionString": "XXXXXXXXXXXXXXXXXX",
        "BlobContainerNameProcessvideo": "processvideo",
        "BlobContainerNameUnProcessvideo": "unprocessvideo",
        "ML_VechileDetection_API": "****",
        "ML_Accident_API": "******",
        "SASURLValidYear": "2",
        "BaseURL": "********",
        "blobstoraccountKey": "******************************",  
        "CosmosDb": {
                "Account": "**********//",
                "Key": "************************",
                "DatabaseName": "********",
                "ContainerName": "******"
                }




## Step 4. Security Access

## Step 5. text here

## Step 6. text here

# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

