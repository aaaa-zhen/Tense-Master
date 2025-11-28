// Verb Tense Practice - Data
const verbs = [
  { base: "eat", pastSimple: "ate", ing: "eating", thirdPerson: "eats" },
  { base: "go", pastSimple: "went", ing: "going", thirdPerson: "goes" },
  { base: "play", pastSimple: "played", ing: "playing", thirdPerson: "plays" },
  { base: "read", pastSimple: "read", ing: "reading", thirdPerson: "reads" },
  { base: "write", pastSimple: "wrote", ing: "writing", thirdPerson: "writes" },
  { base: "run", pastSimple: "ran", ing: "running", thirdPerson: "runs" },
  { base: "swim", pastSimple: "swam", ing: "swimming", thirdPerson: "swims" },
  { base: "speak", pastSimple: "spoke", ing: "speaking", thirdPerson: "speaks" },
  { base: "drink", pastSimple: "drank", ing: "drinking", thirdPerson: "drinks" },
  { base: "sleep", pastSimple: "slept", ing: "sleeping", thirdPerson: "sleeps" },
  { base: "watch", pastSimple: "watched", ing: "watching", thirdPerson: "watches" },
  { base: "cook", pastSimple: "cooked", ing: "cooking", thirdPerson: "cooks" },
  { base: "dance", pastSimple: "danced", ing: "dancing", thirdPerson: "dances" },
  { base: "sing", pastSimple: "sang", ing: "singing", thirdPerson: "sings" },
  { base: "study", pastSimple: "studied", ing: "studying", thirdPerson: "studies" },
  { base: "work", pastSimple: "worked", ing: "working", thirdPerson: "works" },
  { base: "walk", pastSimple: "walked", ing: "walking", thirdPerson: "walks" },
  { base: "talk", pastSimple: "talked", ing: "talking", thirdPerson: "talks" },
  { base: "listen", pastSimple: "listened", ing: "listening", thirdPerson: "listens" },
  { base: "make", pastSimple: "made", ing: "making", thirdPerson: "makes" },
  { base: "take", pastSimple: "took", ing: "taking", thirdPerson: "takes" },
  { base: "give", pastSimple: "gave", ing: "giving", thirdPerson: "gives" },
  { base: "come", pastSimple: "came", ing: "coming", thirdPerson: "comes" },
  { base: "see", pastSimple: "saw", ing: "seeing", thirdPerson: "sees" },
  { base: "buy", pastSimple: "bought", ing: "buying", thirdPerson: "buys" },
  { base: "sit", pastSimple: "sat", ing: "sitting", thirdPerson: "sits" },
  { base: "stand", pastSimple: "stood", ing: "standing", thirdPerson: "stands" },
  { base: "drive", pastSimple: "drove", ing: "driving", thirdPerson: "drives" },
  { base: "fly", pastSimple: "flew", ing: "flying", thirdPerson: "flies" },
  { base: "draw", pastSimple: "drew", ing: "drawing", thirdPerson: "draws" }
];

const subjects = {
  firstSingular: ["I"],
  secondSingular: ["You"],
  thirdSingular: ["He", "She", "It", "Tom", "Lucy", "The cat", "My friend"],
  firstPlural: ["We"],
  thirdPlural: ["They", "The kids", "My parents"]
};

// Time expressions for each tense
const timeExpressions = {
  presentSimple: ["every day", "always", "usually", "often", "sometimes", "never", "on weekends", "in the morning"],
  presentContinuous: ["now", "right now", "at the moment", "currently", "today"],
  pastSimple: ["yesterday", "last week", "last night", "two days ago", "last month", "in 2020"],
  pastContinuous: ["at 8pm yesterday", "when I called", "while", "at that moment", "all day yesterday"]
};

// Tense configurations
const tenseConfig = {
  presentSimple: {
    name: "Present Simple",
    color: "#4CAF50",
    icon: "🌱",
    rules: {
      positive: {
        firstSingular: (verb) => verb.base,
        secondSingular: (verb) => verb.base,
        thirdSingular: (verb) => verb.thirdPerson,
        firstPlural: (verb) => verb.base,
        thirdPlural: (verb) => verb.base
      },
      negative: {
        firstSingular: (verb) => `don't ${verb.base}`,
        secondSingular: (verb) => `don't ${verb.base}`,
        thirdSingular: (verb) => `doesn't ${verb.base}`,
        firstPlural: (verb) => `don't ${verb.base}`,
        thirdPlural: (verb) => `don't ${verb.base}`
      },
      question: {
        firstSingular: (verb, subject) => `Do ${subject.toLowerCase()} ${verb.base}`,
        secondSingular: (verb, subject) => `Do ${subject.toLowerCase()} ${verb.base}`,
        thirdSingular: (verb, subject) => `Does ${subject.toLowerCase()} ${verb.base}`,
        firstPlural: (verb, subject) => `Do ${subject.toLowerCase()} ${verb.base}`,
        thirdPlural: (verb, subject) => `Do ${subject.toLowerCase()} ${verb.base}`
      }
    }
  },
  presentContinuous: {
    name: "Present Continuous",
    color: "#2196F3",
    icon: "🔄",
    rules: {
      positive: {
        firstSingular: (verb) => `am ${verb.ing}`,
        secondSingular: (verb) => `are ${verb.ing}`,
        thirdSingular: (verb) => `is ${verb.ing}`,
        firstPlural: (verb) => `are ${verb.ing}`,
        thirdPlural: (verb) => `are ${verb.ing}`
      },
      negative: {
        firstSingular: (verb) => `am not ${verb.ing}`,
        secondSingular: (verb) => `aren't ${verb.ing}`,
        thirdSingular: (verb) => `isn't ${verb.ing}`,
        firstPlural: (verb) => `aren't ${verb.ing}`,
        thirdPlural: (verb) => `aren't ${verb.ing}`
      },
      question: {
        firstSingular: (verb, subject) => `Am ${subject.toLowerCase()} ${verb.ing}`,
        secondSingular: (verb, subject) => `Are ${subject.toLowerCase()} ${verb.ing}`,
        thirdSingular: (verb, subject) => `Is ${subject.toLowerCase()} ${verb.ing}`,
        firstPlural: (verb, subject) => `Are ${subject.toLowerCase()} ${verb.ing}`,
        thirdPlural: (verb, subject) => `Are ${subject.toLowerCase()} ${verb.ing}`
      }
    }
  },
  pastSimple: {
    name: "Past Simple",
    color: "#FF9800",
    icon: "⏪",
    rules: {
      positive: {
        firstSingular: (verb) => verb.pastSimple,
        secondSingular: (verb) => verb.pastSimple,
        thirdSingular: (verb) => verb.pastSimple,
        firstPlural: (verb) => verb.pastSimple,
        thirdPlural: (verb) => verb.pastSimple
      },
      negative: {
        firstSingular: (verb) => `didn't ${verb.base}`,
        secondSingular: (verb) => `didn't ${verb.base}`,
        thirdSingular: (verb) => `didn't ${verb.base}`,
        firstPlural: (verb) => `didn't ${verb.base}`,
        thirdPlural: (verb) => `didn't ${verb.base}`
      },
      question: {
        firstSingular: (verb, subject) => `Did ${subject.toLowerCase()} ${verb.base}`,
        secondSingular: (verb, subject) => `Did ${subject.toLowerCase()} ${verb.base}`,
        thirdSingular: (verb, subject) => `Did ${subject.toLowerCase()} ${verb.base}`,
        firstPlural: (verb, subject) => `Did ${subject.toLowerCase()} ${verb.base}`,
        thirdPlural: (verb, subject) => `Did ${subject.toLowerCase()} ${verb.base}`
      }
    }
  },
  pastContinuous: {
    name: "Past Continuous",
    color: "#9C27B0",
    icon: "⏳",
    rules: {
      positive: {
        firstSingular: (verb) => `was ${verb.ing}`,
        secondSingular: (verb) => `were ${verb.ing}`,
        thirdSingular: (verb) => `was ${verb.ing}`,
        firstPlural: (verb) => `were ${verb.ing}`,
        thirdPlural: (verb) => `were ${verb.ing}`
      },
      negative: {
        firstSingular: (verb) => `wasn't ${verb.ing}`,
        secondSingular: (verb) => `weren't ${verb.ing}`,
        thirdSingular: (verb) => `wasn't ${verb.ing}`,
        firstPlural: (verb) => `weren't ${verb.ing}`,
        thirdPlural: (verb) => `weren't ${verb.ing}`
      },
      question: {
        firstSingular: (verb, subject) => `Was ${subject.toLowerCase()} ${verb.ing}`,
        secondSingular: (verb, subject) => `Were ${subject.toLowerCase()} ${verb.ing}`,
        thirdSingular: (verb, subject) => `Was ${subject.toLowerCase()} ${verb.ing}`,
        firstPlural: (verb, subject) => `Were ${subject.toLowerCase()} ${verb.ing}`,
        thirdPlural: (verb, subject) => `Were ${subject.toLowerCase()} ${verb.ing}`
      }
    }
  }
};
