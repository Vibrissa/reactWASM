const constraints = {
  audio: false,
  video: { facingMode: "environment" },
};

function handleSuccessWithVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
  return (stream: MediaStream) => {
    video.srcObject = stream;
    const { width, height } = stream.getTracks()[0].getSettings();
    canvas.width = width ?? 0;
    canvas.height = height ?? 0;
  };
}

function handleError(error: any) {
  console.log("navigator.MediaDevices.getUserMedia error: ", error.message, error.name);
}

export const videoStream = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  const handleSuccess = handleSuccessWithVideo(video, canvas);
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
};
