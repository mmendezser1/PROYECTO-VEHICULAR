type Gif = {
  id: String;
  type: String;
  slug: String;
  giphyUrl: String;
  title: String;
  source_tld: String;
  source_post_url: String;
  import_datetime: String;
  username: String;
  images: {
    original: {
      width: String;
      height: String;
      url: String;
    };
    small: {
      width: String;
      height: String;
      url: String;
    };
  };
  tags: Array<String>;
};
