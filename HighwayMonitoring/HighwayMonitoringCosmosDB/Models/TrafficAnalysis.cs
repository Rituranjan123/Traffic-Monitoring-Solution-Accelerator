using Newtonsoft.Json;
using System;

namespace HighwayMonitoringCosmosDB.Models
{
    public class TrafficAnalysis
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty ("tAcamera_Id")]
        public string TAcamera_Id { get; set; }

        [JsonProperty("Taccident")]
        public int Taccident { get; set; }

        [JsonProperty("noaccident")]
        public int noaccident { get; set; }

        [JsonProperty("tAccidentStatus")]
        public int tAccidentStatus { get; set; }

        

        [JsonProperty("tAframe_timestamp")]
        public int TAframe_timestamp { get; set; }

        [JsonProperty("tAvideo_Id")]
        public int tAvideo_Id { get; set; }

    }
}
