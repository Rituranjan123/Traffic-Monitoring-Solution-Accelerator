# Deployment Guide

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

# Quickstart: Create an Azure Resource Group using an ARM template

This Azure Resource Manager (ARM) template will create an Azure resource groups & resource .



This Azure Resource Manager (ARM) template will create an Kubernetes services

[![Deploy to Azure 1](/Media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FRituranjan123%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_AKSResourceGroup.json)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template will open in the Azure portal.
[![Deploy to Azure 0](/media/deploy-to-azure.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FRituranjan123%2FTraffic-Monitoring-Solution-Accelerator%2Fmain%2FARMTemplate%2FARMTemplate_mspoc_MainResourceGroup.json)



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
        
        * Enter the SQL sever connection strings        
           * "ConnectionStrings": {  "XXXXXXXXXXXX" },
        
        * Enter the Blob connection strings  
           * "BlobConnectionString": "XXXXXXXXXXXXXXXXXX",
        
        * Enter the Blob BlobContainer Name  
            * "BlobContainerNameProcessvideo": "processvideo",
            * "BlobContainerNameUnProcessvideo": "unprocessvideo",
        * Enter the AI ML API path  
             * "ML_VechileDetection_API": "****",
             * "ML_Accident_API": "******",

        * Enter the SAS URL expiry year  
             * "SASURLValidYear": "2",

        * Enter the CosmosDb details
        "CosmosDb": {
                "Account": "**********//",
                "Key": "************************",
                "DatabaseName": "********"                
                }




## Step 4. Security Access

## Step 5. text here

## Step 6. text here

# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

