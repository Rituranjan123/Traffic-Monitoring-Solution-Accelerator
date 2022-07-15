# Deployment Guide

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

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

