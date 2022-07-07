import json
from fastapi import FastAPI, UploadFile, File
import requests
from video_save import realTime
import shutil
import yaml
import os



app = FastAPI()


@app.post('/')
async def root(file: UploadFile = File(...)):
    with open(f'{file.filename}', 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        rt = realTime(video=file.filename)
        inference_json = json.dumps(rt, separators=(',', ':'))
        #url = 'https://highwaymonitoringwebapi.azurewebsites.net/api/Vehicletrend'
        url = 'https://highwaymonitoringwebapi.azurewebsites.net/api/Vehicletrend'
        
        #with open(dir_root+ "/config.yaml", "r") as yamlfile:
            #yaml.load(yamlfile, Loader=yaml.FullLoader)
        
        
        print('aa',inference_json)
        headers = {
            'content-type': "application/json",
            'cache-control': "no-cache",

        }

        response = requests.request("POST", url, data = inference_json, headers=headers)
        print(response.text)


    return "Data Posted"

