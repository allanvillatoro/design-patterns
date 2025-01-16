/*
Facade is a structural design pattern that provides a simplified interface to a library, a framework,
or any other complex set of classes.

Facade Method Design Pattern provides a unified interface to a set of interfaces in a subsystem.
Facade defines a high-level interface that makes the subsystem easier to use.
*/

//Set of complex clases
class VideoFile {
  constructor(public fileName: string) {}
}

class OutputCodec {}

class OggCompressionCodec extends OutputCodec {}

class MPEG4CompressionCodec extends OutputCodec {}

class CodecFactory {
  extract(file: VideoFile): string {
    console.log(`CodecFactory: extracting ${file.fileName}`);
    return "CodecFactory: extracted";
  }
}

class BitrateReader {
  static read(file: VideoFile, codec: string) {
    console.log(`BitrateReader: reading ${file.fileName}`);
    return "BitrateReader: read";
  }

  static convert(buffer: string, codec: OutputCodec) {
    console.log("BitrateReader: converting..");
    return "BitrateReader: converted";
  }
}

class AudioMixer {
  fix(result: any): any {
    return "AudioMixer: fixing result...";
  }
}

//Facade class
class VideoConverter {
  convert(fileName: string, format: string): any {
    const file = new VideoFile(fileName);
    let sourceCodec = new CodecFactory().extract(file);
    let destinationCodec: OutputCodec;

    if (format === "mp4") {
      destinationCodec = new MPEG4CompressionCodec();
    } else {
      destinationCodec = new OggCompressionCodec();
    }

    const buffer = BitrateReader.read(file, sourceCodec);
    const result = BitrateReader.convert(buffer, destinationCodec);
    return new AudioMixer().fix(result);
  }
}

//Application class
function mainFacade1() {
  const converter = new VideoConverter();
  const mp4 = converter.convert("youtubevideo.ogg", "mp4");
  console.log(mp4);
}

mainFacade1();
