const constraints = {
  audio: false,
  video: true,
};

function handleSuccessWithVideo(video: HTMLVideoElement) {
  return (stream: MediaStream) => {
    video.srcObject = stream;
  };
}

function handleError(error: any) {
  console.log("navigator.MediaDevices.getUserMedia error: ", error.message, error.name);
}

export const videoStream = (video: HTMLVideoElement) => {
  const handleSuccess = handleSuccessWithVideo(video);
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
};
