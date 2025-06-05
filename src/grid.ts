export class Grid {
  private cards: Array<Card>;

  constructor(numberOfPairs: number) {
    this.cards = new Array<Card>();
    this.initCards(numberOfPairs);
  }

  reinitIfNeeded(numberOfPairs: number) {
    if(numberOfPairs !== this.cards.length / 2) {
      this.cards = new Array<Card>();
      this.initCards(numberOfPairs);
    }
  }

  mapCards<T>(f: (card: Card) => T): Array<T> {
    return this.cards.map(f);
  }

  numOfColsNeededToBeSquare(): number {
    return Math.ceil(Math.sqrt(this.cards.length));
  }

  private initCards(numberOfPairs: number) {
    for(let i = 0; i < numberOfPairs; ++i) {
      const card = new Card(i);
      this.cards.push(card);
      this.cards.push(new Card(card));
    }

    shuffleArray(this.cards);
  }
}


export class Card {
  value: number;
  facing: "up" | "down";

  constructor(value: number);
  constructor(other: Card);
  constructor(x: number | Card) {
    if(typeof(x) === "number") {
      this.value = x;
      this.facing = "down";
    }
    else if(x instanceof Card){
      this.value = x.value;
      this.facing = x.facing;
    }
    else {
      throw x satisfies never;
    }
  }

  flip() {
    switch(this.facing) {
      case "up": {
        this.facing = "down";
        break;
      }
      case "down": {
        this.facing = "up";
        break;
      }
      default:
        throw this.facing satisfies never;
    }
  }
}


function shuffleArray<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
}
