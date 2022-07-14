# Deployment Guide

## Step 1. Download Files
To start, clone or download this repository and navigate to the project's root directory.

## Step 2. Setup Resources
    ### 1. Create a resource group name
    ### 2. Create a Storage account
            a)Create Container 
                a)	process video
                b)	Unprocessed video 
    ### 3)	Create a Cosmos DB account
    ### 4)  Create App service
            a)HighwayMonitoringWebAPI
            b)HighwayMonitoring
    ### 5)Create a SQL Server instance or use exciting SQL server instance 
            a) Run the follwing script in SQL instance


## Step 3. Set up  configuration on appsetting.json in HighwayMonitoringWebAPI

        "ConnectionStrings": {  
  "DefaultConnection": "Server=predictivesql.database.windows.net;Initial Catalog=MicrosoftTrafficMgmt;Persist Security Info=False;User ID=predictiveadmin;Password=root@123;MultipleActiveResultSets=False;TrustServerCertificate=False;"
  },

  "BlobConnectionString": "DefaultEndpointsProtocol=https;AccountName=msstorageblob;AccountKey=4p3NNT34CzPXoYAlDF4+7GNFHTJBv9zV+1D7rFIUIiLH0r7iLNc9ikz9BTwt+v4cpMoQufXd/98x+ASt3kAJoA==;EndpointSuffix=core.windows.net",


  "BlobContainerNameProcessvideo": "processvideo",

  "BlobContainerNameUnProcessvideo": "unprocessvideo",

  "ML_VechileDetection_API": "http://20.124.149.46:8082/",

  "ML_Accident_API": "http://20.124.147.176:8083/",

  "SASURLValidYear": "2",
  "BaseURL": "https://highwaymonitoringwebapi.azurewebsites.net/api/",

  "blobstoraccountKey": "4p3NNT34CzPXoYAlDF4+7GNFHTJBv9zV+1D7rFIUIiLH0r7iLNc9ikz9BTwt+v4cpMoQufXd/98x+ASt3kAJoA==",

  
  "CosmosDb": {
    "Account": "https://mspocdb.documents.azure.com:443//",
    "Key": "R79EBwOGMIbYFnwFXbN33p1eLX30uLVAT1XnIckuxpaZ7y9ZXa1LGaRTeHHD3jIJYuzzTo21cq9NLxHPqPf9uw==",
    "DatabaseName": "HighwayMonitoringSystem2",
    "ContainerName": "VehicleMonitering3"
  }




## Step 4. Security Access

## Step 5. text here

## Step 6. text here

# Congratulations
You have completed this solution accelerator and should now have a report to explore the personalized recommendations:

