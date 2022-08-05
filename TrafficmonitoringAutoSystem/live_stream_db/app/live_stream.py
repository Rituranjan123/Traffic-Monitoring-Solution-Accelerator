import cv2

# Opens the inbuilt camera of laptop to capture video.
cap = cv2.VideoCapture('https://mspocmediaservice-usea.streaming.media.azure.net/3b1f6b2e-a36f-452f-9fb3-d7c4336a2d1a/32745.ism/manifest(format=m3u8-cmaf)')


while(cap.isOpened()):
  ret, frame = cap.read()
  
  # This condition prevents from infinite looping
  # incase video ends.
  if ret == False:
    break
  
  # Save Frame by Frame into disk using imwrite method
  #cv2.imwrite('frame\Frame'+str(i)+'.jpg', frame)
  #i += 1

cap.release()
cv2.destroyAllWindows()
