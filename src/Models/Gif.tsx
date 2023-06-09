class Gif {
  src: string;
  alt: string;
  numberOfLikes: number;
  constructor(src: string, alt: string, numberOfLikes: number = 0) {
    this.src = src;
    this.alt = alt;
    this.numberOfLikes = numberOfLikes;
  }
}
export default Gif;
/*
export type GifType = {
  src: string;
  alt: string;
  numberOfLikes: number;
};

// gifRepository.getGifs()

// const mappedGifs = gifRepositoryMapper.mapData(res): GifType[]

// gifService (application)
// GifRepository (domain)
// GifApiRepository (infrastructure) --> api calls
// GifLocalRepository (infrastructure) --> local json read
*/
