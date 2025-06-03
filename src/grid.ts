export class Grid {
  private cards: Array<Card>;

  constructor(numberOfPairs: number) {
    this.cards = new Array<Card>();

    for(let i = 0; i < numberOfPairs; ++i) {
      const card = {
        color: createRandomColor(),
        facing: "down" as const,
      };
      this.cards.push(card);
      this.cards.push(structuredClone(card));
    }

    shuffleArray(this.cards);
  }

  mapCards<T>(f: (card: Card) => T): Array<T> {
    return this.cards.map(f);
  }
}


export interface Card {
  color: string;
  facing: "up" | "down";
}


function createRandomColor(): string {
  const r = getRandomInt(255);
  const g = getRandomInt(255);
  const b = getRandomInt(255);
  return `rgb(${r}, ${g}, ${b})`;
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffleArray<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
}
