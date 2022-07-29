using HighwayMonitoringCosmosDB.Models;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighwayMonitoringCosmosDB.Services
{
    public class CosmosDbServiceAccident : ICosmosDbServiceAccident
    {
        private Container _container;

        public CosmosDbServiceAccident(
            CosmosClient cosmosDbClient,
            string databaseName,
            string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddAsync(VehicleAccidentLive item)
        {
            await _container.CreateItemAsync(item, new PartitionKey(item.Id));
        }

        public Task AddAsync(TrafficAnalysis item)
        {
            throw new System.NotImplementedException();
        }

        public async Task DeleteAsync(string id)
        {
            await _container.DeleteItemAsync<VehicleAccidentLive>(id, new PartitionKey(id));
        }

        public async Task<VehicleAccidentLive> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<VehicleAccidentLive>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException) //For handling item not found and other exceptions
            {
                return null;
            }
        }

        public async Task<IEnumerable<VehicleAccidentLive>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<VehicleAccidentLive>(new QueryDefinition(queryString));

            var results = new List<VehicleAccidentLive>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task<IEnumerable<TrafficAnalysis>> GetMultipleAsyncAccient(string queryString)
        {
            var query = _container.GetItemQueryIterator<TrafficAnalysis>(new QueryDefinition(queryString));

            var results = new List<TrafficAnalysis>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateAsync(string id, VehicleAccidentLive item)
        {
            await _container.UpsertItemAsync(item, new PartitionKey(id));
        }

        public Task UpdateAsync(string id, TrafficAnalysis item)
        {
            throw new System.NotImplementedException();
        }

        Task<IEnumerable<TrafficAnalysis>> ICosmosDbServiceAccident.GetMultipleAsync(string query)
        {
            throw new System.NotImplementedException();
        }
    }
}
