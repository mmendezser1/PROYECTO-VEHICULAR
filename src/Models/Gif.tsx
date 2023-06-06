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
