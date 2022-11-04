const expect = chai.expect;

let pokemonfunctions;

describe("pokemonfunctions", () => {
  beforeEach(() => {
    pokemonfunctions = new Pokemonfunctions();
  });

  it("should return an array of max numbers of Pokemon cards", () => {
    return pokemonfunctions.getAllCards().then((actual) => {
      expect(Array.isArray(actual)).to.equal(true);
      expect(actual.length).to.equal(150);
    });
  });

  it("should return different array of numbers", () => {
    const numArray1 = pokemonfunctions.getRandomNumbers(5);
    const numArray2 = pokemonfunctions.getRandomNumbers(5);
    let bool = true;
    for (let i = 0; i < numArray1.length; i++) {
      if (numArray1[i] !== numArray2[i]) {
        bool = false;
        break;
      }
    }
    expect(bool).to.equal(false);
  });

});