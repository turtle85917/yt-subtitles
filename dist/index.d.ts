/**
 * Load the subtitles of the video.
 *
 * @param video Video id. `https://youtube.com/watch?v=id`
 * @param lang Language of subtitles to load. Default value is `ko`.
 * @returns Result
 */
export default function getSubtitles(video: string, lang?: string): Promise<Text[][]>;
interface Text {
    start: number;
    duration: number;
    font: Font[];
}
interface Font {
    color: string;
    content: string;
}
export {};
