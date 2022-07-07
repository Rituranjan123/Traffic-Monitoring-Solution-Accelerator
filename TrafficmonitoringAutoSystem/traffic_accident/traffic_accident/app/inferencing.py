import cv2
import os
import json
from imageai.Prediction.Custom import CustomImagePrediction
from copy import deepcopy
from pathlib import Path

cwd = os.getcwd()


def predict_video(video_path):
    predictor = CustomImagePrediction()
    predictor.setModelPath(
        model_path=os.path.join(cwd, "trafficnet_resnet_model_ex-055_acc-0.913750.h5"))
    predictor.setJsonPath(
        model_json=os.path.join(cwd, "model_class.json"))
    predictor.loadFullModel(num_objects=4)

    cap = cv2.VideoCapture(video_path)
    # calculate duration of the video
    fps = (cap.get(cv2.CAP_PROP_FPS))
    #fps = 5

    #print(fps)

    Id = {"id": "1"}
    camera_id = {"tAcamera_Id": "1"}

    video_id = Path(video_path).stem

    # Empty list and dictionary to store values
    json_dict = {}
    json_list = []

   

    # # Initialising Video writer
    # output_video = cv2.VideoWriter(
    #     os.path.join(r"C:\Users\ShreyaSharma\Documents\Projects\Sony-Object-Detection\accident-detection-system\Traffic-Net\accident-detection\results",
    #                  "3042_processed.mp4"),
    #     cv2.VideoWriter_fourcc(*'avc1'), 24, (
    #         (int(cap.get(3)), int(cap.get(4)))))

    progress_tracker = 0
    response_label = ""
    accident = ""
    no_accident = ""
    tAccidentStat = ""
    skip_frame = 1

    while cap.isOpened():
        valid, frame = cap.read()

        if valid == True:
            frame_stamp = (cap.get(cv2.CAP_PROP_POS_MSEC)) / 1000

            progress_tracker += 1

            if progress_tracker % skip_frame == 0:
                cv2.imwrite("video_image99.jpg", frame)

            # Predicting each frame of video
            try:
                predictions, probabilities = predictor.classifyImage(
                    image_input="video_image99.jpg", result_count=1)

                if predictions == ['Accident'] or predictions == ['Fire']:
                    predictions = "Accident"
                    tAccidentStat = "1"
                    accident = "1"
                    no_accident = "0"

                elif predictions == ['Sparse_Traffic'] or predictions == ['Dense_Traffic']:
                    predictions = "No Accident"
                    tAccidentStat = "0"
                    accident = "0"
                    no_accident = "1"

                else:
                    predictions = "No Accident"
                    tAccidentStat = "0"
                    accident = "0"
                    no_accident = "0"

                response_label = predictions + ":" + "{:.2f}".format(probabilities[0]) + "%"

            except:
                None

            # Dumping all the required values in dictionary
            json_dict.update(Id)
            json_dict.update(camera_id)
            json_dict["tAccident"] = int(accident)
            json_dict["noaccident"] = int(no_accident)
            json_dict["tAccidentStatus"] = int(tAccidentStat)
            json_dict["tAframe_timestamp"] = int(frame_stamp)
            json_dict["tAvideo_Id"] = int(video_id)

            # Appending the resultant dictionary into list
            json_list.append(deepcopy(json_dict))

            font = cv2.FONT_HERSHEY_PLAIN
            frame = cv2.putText(frame, '{}'.format(response_label), (150, 35), font, 3, (207, 109, 4), 3, cv2.LINE_AA)

            #cv2.imshow("output", frame)

            # # Writing frames into file
            # output_video.write(frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        else:
            break

    cap.release()
    # output_video.release()
    cv2.destroyAllWindows()

    # Converting list of dictionary into json
    json_list_final = []
    for i in range(0, len(json_list), int(fps)):
        k = json_list[i]
        json_list_final.append(k)

    # with open('1.json'), 'w', encoding='utf-8') as f:
    #     json.dump(json_list_final, f, ensure_ascii=False, indent=4)
    return json_list_final


# # Calling function
# p = predict_video('3274.mp4')
# print(p)
