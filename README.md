# yt-subtitles

Load the subtitles of the video.

# Usage
```js
import youtubeSubtitles from "yt-subtitles";
youtubeSubtitles("video id").then(data => {
  console.log(data);
});
```

## Returns

`Text`[] - *Result*

### Text - *Object*
- start: `number`
- duration: `number`
- font: `Font`[]

### Font - *Object*
- color: `string`
- content: `string`
