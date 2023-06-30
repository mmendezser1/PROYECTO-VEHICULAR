export const gifBuilder = () => {
  let defaultGif: Gif = getDefaultGif();

  return {
    withTitle: function (title: string) {
      defaultGif.title = title;
      return this;
    },
    build: function () {
      return defaultGif;
    },
  };
};

function getDefaultGif() {
  const myGif: Gif = {
    id: "defaultID",
    type: "gif",
    slug: "",
    giphyUrl:
      "https://giphy.com/gifs/moodman-movie-brazil-the-YleuWir5NTNVXkflSp",
    title: "",
    source_tld: "",
    source_post_url: "",
    import_datetime: "2023-06-30 02:24:22",
    username: "",
    images: {
      original: {
        width: "500",
        height: "500",
        url: "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/giphy.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=giphy.gif",
      },
      small: {
        width: "200",
        height: "200",
        url: "https://media4.giphy.com/media/YleuWir5NTNVXkflSp/200w.gif?cid=be655fb7f245f7d29df0fc743b70e3ee884dbaf31956e789&rid=200w.gif",
      },
    },
    tags: ["#defaltTag1", "#defaltTag2", "#defaltTag3"],
  };
  return myGif;
}
