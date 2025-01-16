/*
The Proxy Design Pattern a structural design pattern is a way to use a placeholder object to control access
to another object. Instead of interacting directly with the main object, the client talks to the proxy,
which then manages the interaction. This is useful for things like controlling access, delaying object creation
until it’s needed (lazy initialization), logging, or adding security checks.
*/

//Some interface for getting the data.
interface IVideo {
  id: string;
  name: string;
  info: string;
  video: string;
}

interface IVideoListItem {
  id: string;
  name: string;
}

interface IVideoMetaData {
  id: string;
  name: string;
  info: string;
}

//Service Interface
interface ThirdPartyYouTubeLib {
  listVideos(): IVideoListItem[];
  getVideoInfo(id: string): IVideoMetaData | null;
  downloadVideo(id: string): IVideo | null;
}

//The Service / Concrete implementation of a service connector
//Since this would be a Third Party class and we can't control it, we need a proxy.
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  private videosList: IVideo[] = [
    {
      id: "1",
      name: "Trip to Rome",
      info: "Trip to Rome in 2022. Visited Coliseum, Roman Forum",
      video: "3940890238423",
    },
    {
      id: "2",
      name: "Trip to London",
      info: "Trip to London in 2023. Visited Big Ben and London Eye",
      video: "4234232342324",
    },
    {
      id: "3",
      name: "Trip to Paris",
      info: "Trip to Paris in 2024. Visited Eiffel Tower and Montmartre",
      video: "4545345543555",
    },
  ];

  listVideos() {
    console.log("Sending API request to YouTube...");
    return this.videosList.map((video) => ({ id: video.id, name: video.name }));
  }

  getVideoInfo(id: string) {
    console.log(`Getting video ${id} metadata from YouTube...`);
    const foundVideoInfo = this.videosList.find((video) => id === video.id);
    return foundVideoInfo
      ? {
          id: foundVideoInfo.id,
          info: foundVideoInfo.info,
          name: foundVideoInfo.name,
        }
      : null;
  }

  downloadVideo(id: string) {
    console.log(`Downloading a video ${id} file from YouTube...`);
    return this.videosList.find((video) => video.id === id) ?? null;
  }
}

//Proxy class
//This should use the same interface as the Service class.
class CachedYouTubeClass implements ThirdPartyYouTubeLib {
  private service: ThirdPartyYouTubeLib;
  private listCache: IVideoListItem[];
  private videoInfoCache: IVideoMetaData[];
  private downloadedVideos: IVideo[];
  needReset: boolean;

  constructor(service: ThirdPartyYouTubeLib) {
    this.service = service;
    this.needReset = false;
    this.videoInfoCache = [];
    this.listCache = [];
    this.downloadedVideos = [];
  }

  listVideos() {
    if (this.listCache.length === 0 || this.needReset) {
      this.listCache = this.service.listVideos();
    } else {
      console.log("Retrieved video list from the cache...");
    }
    return this.listCache;
  }

  getVideoInfo(id: string) {
    const foundVideoInfoCache =
      this.videoInfoCache.find((video) => video.id === id) ?? null;
    if (!foundVideoInfoCache || this.needReset) {
      const videoInfo = this.service.getVideoInfo(id);
      if (videoInfo) this.videoInfoCache.push(videoInfo);
      return videoInfo;
    } else {
      console.log(`Retrieved video ${id} info from the cache...`);
    }
    return foundVideoInfoCache;
  }

  downloadVideo(id: string) {
    const foundDownloadedVideo =
      this.downloadedVideos.find((video) => video.id === id) ?? null;
    if (!foundDownloadedVideo || this.needReset) {
      const video = this.service.downloadVideo(id);
      if (video) this.downloadedVideos.push(video);
      return video;
    } else {
      console.log(`Retrieved video ${id} from the cache...`);
    }
    return foundDownloadedVideo;
  }

  resetCache() {
    this.videoInfoCache = [];
    this.listCache = [];
    this.downloadedVideos = [];
  }
}

//Client
//This would use the Proxy instead of the service directly
//Should work with either the Proxy or service directly
class YouTubeManager {
  private service: ThirdPartyYouTubeLib;

  constructor(service: ThirdPartyYouTubeLib) {
    this.service = service;
  }

  renderVideoPage(id: string) {
    console.log("Manager - getting video info");
    const videoInfo = this.service.getVideoInfo(id);
    console.log("videoInfo is: ", videoInfo);
    return videoInfo;
  }

  renderListPanel() {
    console.log("Manager - getting video list");
    const list = this.service.listVideos();
    list.forEach((video) => {
      console.log(`${video.id}: ${video.name}`);
    });
    return list;
  }

  playVideo(id: string) {
    console.log("Manager - getting video");
    const video = this.service.downloadVideo(id);
    console.log("Video content is: ", video?.video);
  }
}

function mainProxy1() {
  //Normal third-party library class instance
  const aYouTubeService = new ThirdPartyYouTubeClass();
  //Our proxy instance
  const aYouTubeProxy = new CachedYouTubeClass(aYouTubeService);
  //The client
  const manager = new YouTubeManager(aYouTubeProxy);

  //Display list of videos
  manager.renderListPanel();

  //Show specific video info
  manager.renderVideoPage("1");

  //Watch the video
  manager.playVideo("1");

  //Uses cache
  manager.renderListPanel();
  manager.renderVideoPage("1");
  manager.playVideo("1");

  //This was not cached
  manager.playVideo("2");

  //Reset cache
  aYouTubeProxy.needReset = true;
  //It downloads the video again
  manager.playVideo("1");

  //Allow caching again
  aYouTubeProxy.needReset = false;

  //Reset cache
  aYouTubeProxy.resetCache();

  //It gets the list from the server again.
  manager.renderListPanel();
}

mainProxy1();
