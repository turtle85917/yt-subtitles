import axios from "axios";

const REGEX_CAPTION_TRACKS = /({"captionTracks":.*isTranslatable":(true|false)}])/;
const REGEX_PARSING_TEXT = /<text start="([\d.]+)" dur="([\d.]+)">(.+?)<\/text>/gs;
const REGEX_PARSING_FONT = /<font color="(#[A-F\d]+)">(.+?)<\/font>/g;

/**
 * Load the subtitles of the video.
 * 
 * @param video Video id. `https://youtube.com/watch?v=id`
 * @param lang Language of subtitles to load. Default value is `ko`.
 * @returns Result
 */
export async function getSubtitles(video: string, lang: string = "ko") {
  const captionTracks = await getSubtitlesList(video);
  const subtitle = captionTracks.find(track => track.languageCode === lang || track.name.simpleText === lang);
  if (!subtitle || (subtitle && !subtitle.baseUrl)) throw Error(`This video does not support subtitles in that language(${lang}).`);
  const { data: transcript } = await axios.get<string>(subtitle.baseUrl);
  const chunks = transcript
    .replace('<?xml version="1.0" encoding="utf-8" ?><transcript>', '')
    .replace("</transcript>", '')
    .split("</split>")
    .filter(chunk => chunk && chunk.trim())
    .map(chunk => {
      const humanText = chunk
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, '\'')
        .replace(/&amp;/gi, '&');
      return [...humanText.matchAll(REGEX_PARSING_TEXT)].map<Text>(child => ({
        start: parseFloat(child[1]),
        duration: parseFloat(child[2]),
        font: [...child[3].matchAll(REGEX_PARSING_FONT)].map(item => ({ color: item[1], content: item[2] })),
        content: !REGEX_PARSING_FONT.test(child[3]) ? child[3].replace(/&quot;/gi, '"').replace(/&#39;/gi, '\'') : undefined
      }));
    });
  return chunks[0];
}

/**
 * Bring up the list of subtitle languages that exist.
 * 
 * @param video Video id. `https://youtube.com/watch?v=id`
 */
export async function getSubtitlesList(video: string) {
  const { data } = await axios.get<string>(`https://youtube.com/watch?v=${video}`);
  const execArray = REGEX_CAPTION_TRACKS.exec(data);
  const { captionTracks } = JSON.parse((execArray?.[0] ?? '{') + '}');
  return captionTracks as CaptionTracks[];
}

interface CaptionTracks {
  baseUrl: string;
  name: {
    simpleText: string;
  }
  vssId: string;
  languageCode: string;
  kind?: string;
  isTranslateble: boolean;
}

interface Text {
  start: number;
  duration: number;
  font: Font[];
  content?: string;
}

interface Font {
  color: string;
  content: string;
}
