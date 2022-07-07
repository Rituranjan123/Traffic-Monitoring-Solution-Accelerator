using Newtonsoft.Json;
using System;

namespace HighwayMonitoringCosmosDB.Models
{
    public class Vehicletrend
    {
        [JsonProperty(PropertyName = "id")]
        public string  Id { get; set; }

        [JsonProperty("camera_Id")]
        public int camera_Id { get; set; }

        [JsonProperty("car")]
        public int car { get; set; }

        [JsonProperty("bus")]
        public int bus { get; set; }

        [JsonProperty("motorbike")]
        public int motorbike { get; set; }

        [JsonProperty("truck")]
        public int truck { get; set; }

        [JsonProperty("frame_timestamp")]
        public Decimal frame_timestamp { get; set; }

        [JsonProperty("VideoID")]
        public int VideoID { get; set; }



    }
}
