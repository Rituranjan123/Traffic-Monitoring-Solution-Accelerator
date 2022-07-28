using Newtonsoft.Json;
using System;

namespace HighwayMonitoringCosmosDB.Models
{
    public class TrafficAnalysis


    public class VehicleAccidentLive
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty("tAcamera_id")]
        public string TAcamera_Id { get; set; }

        
        [JsonProperty("tAccidentStatus")]
        public long tAccidentStatus { get; set; }

        [JsonProperty("current_timestamp")]
        public long current_timestamp { get; set; }

        

        [JsonProperty("tAframe_Id")]
        public long tAframe_Id { get; set; }

       
    }
}
