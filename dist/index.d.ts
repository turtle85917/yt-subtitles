/**
 * Load the subtitles of the video.
 *
 * @param video Video id. `https://youtube.com/watch?v=id`
 * @param lang Language of subtitles to load. Default value is `ko`.
 * @returns Result
 */
export declare function getSubtitles(video: string, lang?: string): Promise<Text[]>;
/**
 * Bring up the list of subtitle languages that exist.
 *
 * @param video Video id. `https://youtube.com/watch?v=id`
 */
export declare function getSubtitlesList(video: string): Promise<CaptionTracks[]>;
interface CaptionTracks {
    baseUrl: string;
    name: {
        simpleText: string;
    };
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
export {};
