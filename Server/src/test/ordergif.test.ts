import { orderGifs } from "../routes";
import emptyDb from "../../data/fixtures/emptydb.json";
import twoElementsSameLikes from "../../data/fixtures/twoElementsSameLikes.json";
import twoElementsDifferentLikes from "../../data/fixtures/twoElementsDifferentLikes.json";

describe("Testing gif function order", () => {
  it("Test if DB is empty", () => {
    const result = orderGifs(emptyDb.gifs);
    expect(result).toHaveLength(0);
  });

  it("Test with two gifs with same likes", () => {
    const result = orderGifs(twoElementsSameLikes.gifs);
    expect(result).toHaveLength(2);
  });
  it("Test with two gifs with different likes", () => {
    const result = orderGifs(twoElementsDifferentLikes.gifs);

    const firstElement = result[0];
    const secondElement = result[1];
    expect(
      firstElement.numberOfLikes > secondElement.numberOfLikes
    ).toBeTruthy();
  });
});
