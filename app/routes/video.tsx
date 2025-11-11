import {controllers} from "~/src/Controllers/Controllers";
import {VideoPlayerPage} from "~/src/ViewsNew/VideoPlayerPage/VideoPlayerPage";


export default function Video() {
  return <VideoPlayerPage  ref={controllers().main.videoPlayerPage.set} controller={controllers().main.videoPlayerPage} />
}
