using HighwayMonitoringCosmosDB.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HighwayMonitoringCosmosDB.Services
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<Vehicletrend>> GetMultipleAsync(string query);
        Task<Vehicletrend> GetAsync(string id);
        Task AddAsync(Vehicletrend item);
        Task UpdateAsync(string id, Vehicletrend item);
        Task DeleteAsync(string id);
    }
    public interface ICosmosDbServiceAccident
    {
       Task<IEnumerable<TrafficAnalysis>> GetMultipleAsync(string query);
        Task<TrafficAnalysis> GetAsync(string camera_Id);
        Task AddAsync(TrafficAnalysis item);
        Task UpdateAsync(string id, TrafficAnalysis item);
        Task DeleteAsync(string camera_Id);
    }
}
