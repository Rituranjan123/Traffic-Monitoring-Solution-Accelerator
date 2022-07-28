using HighwayMonitoringCosmosDB.Models;
using HighwayMonitoringCosmosDB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using UtilityLibrary;
using System.Diagnostics;
using System.Threading;
using System.Linq;

namespace HighwayMonitoringCosmosDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicletrendLiveController : ControllerBase
    {
        private readonly ICosmosDbServiceLive _cosmosDbService;
        ICosmosDbServiceLiveAccidennt _cosmosDbServiceLiveAccidennt;

        private readonly IConfiguration _configuration;
        #region Vechile Trends CRUD
        public VehicletrendLiveController(ICosmosDbServiceLive cosmosDbService, IConfiguration configuration, ICosmosDbServiceLiveAccidennt  cosmosDbServiceLiveAccidennt)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
            _configuration = configuration;
            _cosmosDbServiceLiveAccidennt= cosmosDbServiceLiveAccidennt ?? throw new ArgumentNullException(nameof(cosmosDbServiceLiveAccidennt));
        }


        
        [HttpPost("GetBycameraId")]
        public async Task<IActionResult> GetBycameraId(LiveStramFilter liveStramFilter)
        {
            try
            {
                if (liveStramFilter.currenttimestamp == 0)
                {
                    liveStramFilter.currenttimestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                    Thread.Sleep(10000);
                }
                string query = "SELECT * FROM VehicleTrendingLive v ";
                //liveStramFilter.cameraId = 1;
                query = "SELECT * FROM VehicleTrendingLive v where v.camera_Id = " + liveStramFilter.cameraId + " and v.current_time > " + liveStramFilter.currenttimestamp;
                LiveChartData liveChartData = new LiveChartData();


                var result = await _cosmosDbService.GetMultipleAsync(query);
                liveChartData.VehicleTrendingLive = result.Cast<VehicleTrendingLive>().ToArray();
                query = "SELECT * FROM VehicleAccidentLive v ";
                //  query = "SELECT * FROM VehicleAccidentLive v where v.tAcamera_id = " + liveStramFilter.cameraId + " and v.current_timestamp > " + liveStramFilter.currenttimestamp;               
                var r = await _cosmosDbServiceLiveAccidennt.GetMultipleAsync(query);
                liveChartData.trafficAccidentLive = r.Cast<VehicleAccidentLive>().ToArray();
                var s = result.GetEnumerator();
                

                return Ok(liveChartData);
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

    }
    #endregion
}

