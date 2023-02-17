import { getSubtitles, getSubtitlesList } from "../dist";

getSubtitlesList("qZi1Xh0_8q4-Q").then(data => {
  console.log(data);
});

getSubtitles("qZi1Xh0_8q4", "ko").then(data => {
  console.log(data);
});
