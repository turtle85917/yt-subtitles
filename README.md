# yt-subtitles

Load the subtitles of the video.

# Usage
```js
import { getSubtitles } from "yt-subtitles";
getSubtitles("video id", "ko).then(data => {
  console.log(data);
});
```

## Returns

`Text[]` - *Result*

### Text - *Object*
- start: `number`
- duration: `number`
- font: `Font[]`
- content?: `string`

### Font - *Object*
- color: `string`
- content: `string`

```js
import { getSubtitlesList } from "yt-subtitles";
getSubtitlesList("video id").then(data => {
  console.log(data);
});
```

## Returns
`CaptionTracks[]`

### CaptionTracks
- baseUrl: `string`
- name: { simpleText: `string` }
- vssId: `string`
- languageCode: `string`
- kind?: `string`
- isTranslateble: `boolean`

# Origin
algolia - [youtube-captions-scraper](https://www.npmjs.com/package/youtube-captions-scraper)
