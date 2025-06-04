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

  private initCards(numberOfPairs: number) {
    for(let i = 0; i < numberOfPairs; ++i) {
      const card = {
        value: i,
        facing: "down" as const,
      };
      this.cards.push(card);
      this.cards.push(structuredClone(card));
    }

    shuffleArray(this.cards);
  }
}


export interface Card {
  value: number;
  facing: "up" | "down";
}


function shuffleArray<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
}
