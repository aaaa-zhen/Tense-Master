// ========================================
// Tense Master - Main Application Logic
// ========================================

class TenseMaster {
  constructor() {
    this.currentTab = 'chart';
    this.drillCount = 0;
    this.currentDrill = null;
    this.builtSentence = [];

    // Test mode
    this.testFilter = 'all';
    this.currentTest = null;
    this.stats = { correct: 0, streak: 0, score: 0 };

    // Formula text for drill mode - split by subject type
    this.formulas = {
      presentSimple: {
        positive: {
          default: "I / You / We / They + verb\nHe / She / It + verb + s/es",
          firstSingular: "I + verb",
          secondSingular: "You + verb",
          thirdSingular: "He / She / It + verb + s/es",
          firstPlural: "We + verb",
          thirdPlural: "They + verb"
        },
        negative: {
          default: "I / You / We / They + don't + verb\nHe / She / It + doesn't + verb",
          firstSingular: "I + don't + verb",
          secondSingular: "You + don't + verb",
          thirdSingular: "He / She / It + doesn't + verb",
          firstPlural: "We + don't + verb",
          thirdPlural: "They + don't + verb"
        },
        question: {
          default: "Do + I / you / we / they + verb ?\nDoes + he / she / it + verb ?",
          firstSingular: "Do + I + verb ?",
          secondSingular: "Do + you + verb ?",
          thirdSingular: "Does + he / she / it + verb ?",
          firstPlural: "Do + we + verb ?",
          thirdPlural: "Do + they + verb ?"
        }
      },
      presentContinuous: {
        positive: {
          default: "I + am + verb-ing\nHe / She / It + is + verb-ing\nYou / We / They + are + verb-ing",
          firstSingular: "I + am + verb-ing",
          secondSingular: "You + are + verb-ing",
          thirdSingular: "He / She / It + is + verb-ing",
          firstPlural: "We + are + verb-ing",
          thirdPlural: "They + are + verb-ing"
        },
        negative: {
          default: "I + am not + verb-ing\nHe / She / It + isn't + verb-ing\nYou / We / They + aren't + verb-ing",
          firstSingular: "I + am not + verb-ing",
          secondSingular: "You + aren't + verb-ing",
          thirdSingular: "He / She / It + isn't + verb-ing",
          firstPlural: "We + aren't + verb-ing",
          thirdPlural: "They + aren't + verb-ing"
        },
        question: {
          default: "Am + I + verb-ing ?\nIs + he / she / it + verb-ing ?\nAre + you / we / they + verb-ing ?",
          firstSingular: "Am + I + verb-ing ?",
          secondSingular: "Are + you + verb-ing ?",
          thirdSingular: "Is + he / she / it + verb-ing ?",
          firstPlural: "Are + we + verb-ing ?",
          thirdPlural: "Are + they + verb-ing ?"
        }
      },
      pastSimple: {
        positive: {
          default: "All subjects + verb-ed (past form)",
          firstSingular: "I + verb-ed (past form)",
          secondSingular: "You + verb-ed (past form)",
          thirdSingular: "He / She / It + verb-ed (past form)",
          firstPlural: "We + verb-ed (past form)",
          thirdPlural: "They + verb-ed (past form)"
        },
        negative: {
          default: "All subjects + didn't + verb (base)",
          firstSingular: "I + didn't + verb (base)",
          secondSingular: "You + didn't + verb (base)",
          thirdSingular: "He / She / It + didn't + verb (base)",
          firstPlural: "We + didn't + verb (base)",
          thirdPlural: "They + didn't + verb (base)"
        },
        question: {
          default: "Did + subject + verb (base) ?",
          firstSingular: "Did + I + verb (base) ?",
          secondSingular: "Did + you + verb (base) ?",
          thirdSingular: "Did + he / she / it + verb (base) ?",
          firstPlural: "Did + we + verb (base) ?",
          thirdPlural: "Did + they + verb (base) ?"
        }
      },
      pastContinuous: {
        positive: {
          default: "I / He / She / It + was + verb-ing\nYou / We / They + were + verb-ing",
          firstSingular: "I + was + verb-ing",
          secondSingular: "You + were + verb-ing",
          thirdSingular: "He / She / It + was + verb-ing",
          firstPlural: "We + were + verb-ing",
          thirdPlural: "They + were + verb-ing"
        },
        negative: {
          default: "I / He / She / It + wasn't + verb-ing\nYou / We / They + weren't + verb-ing",
          firstSingular: "I + wasn't + verb-ing",
          secondSingular: "You + weren't + verb-ing",
          thirdSingular: "He / She / It + wasn't + verb-ing",
          firstPlural: "We + weren't + verb-ing",
          thirdPlural: "They + weren't + verb-ing"
        },
        question: {
          default: "Was + I / he / she / it + verb-ing ?\nWere + you / we / they + verb-ing ?",
          firstSingular: "Was + I + verb-ing ?",
          secondSingular: "Were + you + verb-ing ?",
          thirdSingular: "Was + he / she / it + verb-ing ?",
          firstPlural: "Were + we + verb-ing ?",
          thirdPlural: "Were + they + verb-ing ?"
        }
      }
    };

    this.loadStats();
    this.init();
  }

  init() {
    this.bindEvents();
    this.generateDrill();
    this.generateTest();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.currentTarget.dataset.tab);
      });
    });

    // Drill settings
    document.getElementById('drill-tense').addEventListener('change', () => this.generateDrill());
    document.getElementById('drill-form').addEventListener('change', () => this.generateDrill());

    // Drill buttons
    document.getElementById('drill-clear').addEventListener('click', () => this.clearDrill());
    document.getElementById('drill-check').addEventListener('click', () => this.checkDrill());
    document.getElementById('drill-next').addEventListener('click', () => this.nextDrill());

    // Drill input - check on every input
    document.getElementById('drill-input').addEventListener('input', (e) => {
      this.checkDrillInput();
    });

    // Test filter
    document.querySelectorAll('#test-filter .filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#test-filter .filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.testFilter = e.currentTarget.dataset.tense;
        this.generateTest();
      });
    });

    // Test buttons
    document.getElementById('test-check').addEventListener('click', () => this.checkTest());
    document.getElementById('test-next').addEventListener('click', () => this.nextTest());

    // Test input enter
    document.getElementById('test-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const checkBtn = document.getElementById('test-check');
        const nextBtn = document.getElementById('test-next');
        if (checkBtn.style.display !== 'none') {
          this.checkTest();
        } else {
          this.nextTest();
        }
      }
    });
  }

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tab}-tab`);
    });

    if (tab === 'drill') this.generateDrill();
    if (tab === 'test') this.generateTest();
  }

  // ==================== DRILL MODE ====================

  generateDrill() {
    const tenseKey = document.getElementById('drill-tense').value;
    const form = document.getElementById('drill-form').value;

    // Get random verb and subject
    const verb = this.getRandomItem(verbs);
    const subjectType = this.getRandomItem(Object.keys(subjects));
    const subject = this.getRandomItem(subjects[subjectType]);
    const timeExp = this.getRandomItem(timeExpressions[tenseKey]);

    // Update formula display - show specific formula for this subject type
    const formulaText = this.formulas[tenseKey][form][subjectType];
    document.getElementById('drill-formula').textContent = formulaText;

    // Generate correct answer parts
    const answerParts = this.generateAnswerParts(tenseKey, form, verb, subject, subjectType);

    this.currentDrill = {
      tenseKey,
      form,
      verb,
      subject,
      subjectType,
      timeExp,
      correctParts: answerParts.parts,
      correctSentence: answerParts.sentence
    };

    // Update UI
    document.getElementById('drill-subject').textContent = form === 'question' ? '' : subject;
    document.getElementById('drill-verb').textContent = verb.base;
    document.getElementById('drill-extra').textContent = form === 'question' ? timeExp + '?' : timeExp;

    // Clear input
    const input = document.getElementById('drill-input');
    input.value = '';
    input.className = 'drill-input';
    input.disabled = false;
    input.focus();

    // Reset result
    document.getElementById('drill-result').classList.remove('show', 'correct', 'incorrect');
    document.getElementById('drill-check').style.display = 'flex';
    document.getElementById('drill-next').style.display = 'none';
  }

  generateAnswerParts(tenseKey, form, verb, subject, subjectType) {
    const parts = [];
    let sentence = '';

    const isThirdSingular = subjectType === 'thirdSingular';
    const isFirstSingular = subjectType === 'firstSingular';
    const usesWas = isFirstSingular || isThirdSingular;

    if (tenseKey === 'presentSimple') {
      if (form === 'positive') {
        parts.push(subject);
        parts.push(isThirdSingular ? verb.thirdPerson : verb.base);
        sentence = `${subject} ${isThirdSingular ? verb.thirdPerson : verb.base}`;
      } else if (form === 'negative') {
        parts.push(subject);
        parts.push(isThirdSingular ? "doesn't" : "don't");
        parts.push(verb.base);
        sentence = `${subject} ${isThirdSingular ? "doesn't" : "don't"} ${verb.base}`;
      } else {
        parts.push(isThirdSingular ? "Does" : "Do");
        parts.push(subject.toLowerCase());
        parts.push(verb.base);
        sentence = `${isThirdSingular ? "Does" : "Do"} ${subject.toLowerCase()} ${verb.base}`;
      }
    } else if (tenseKey === 'presentContinuous') {
      const beVerb = isFirstSingular ? 'am' : (isThirdSingular ? 'is' : 'are');
      const beVerbNeg = isFirstSingular ? 'am not' : (isThirdSingular ? "isn't" : "aren't");

      if (form === 'positive') {
        parts.push(subject);
        parts.push(beVerb);
        parts.push(verb.ing);
        sentence = `${subject} ${beVerb} ${verb.ing}`;
      } else if (form === 'negative') {
        parts.push(subject);
        parts.push(beVerbNeg);
        parts.push(verb.ing);
        sentence = `${subject} ${beVerbNeg} ${verb.ing}`;
      } else {
        const beQ = isFirstSingular ? 'Am' : (isThirdSingular ? 'Is' : 'Are');
        parts.push(beQ);
        parts.push(subject.toLowerCase());
        parts.push(verb.ing);
        sentence = `${beQ} ${subject.toLowerCase()} ${verb.ing}`;
      }
    } else if (tenseKey === 'pastSimple') {
      if (form === 'positive') {
        parts.push(subject);
        parts.push(verb.pastSimple);
        sentence = `${subject} ${verb.pastSimple}`;
      } else if (form === 'negative') {
        parts.push(subject);
        parts.push("didn't");
        parts.push(verb.base);
        sentence = `${subject} didn't ${verb.base}`;
      } else {
        parts.push("Did");
        parts.push(subject.toLowerCase());
        parts.push(verb.base);
        sentence = `Did ${subject.toLowerCase()} ${verb.base}`;
      }
    } else if (tenseKey === 'pastContinuous') {
      const wasWere = usesWas ? 'was' : 'were';
      const wasWereNeg = usesWas ? "wasn't" : "weren't";

      if (form === 'positive') {
        parts.push(subject);
        parts.push(wasWere);
        parts.push(verb.ing);
        sentence = `${subject} ${wasWere} ${verb.ing}`;
      } else if (form === 'negative') {
        parts.push(subject);
        parts.push(wasWereNeg);
        parts.push(verb.ing);
        sentence = `${subject} ${wasWereNeg} ${verb.ing}`;
      } else {
        const wasWereQ = usesWas ? 'Was' : 'Were';
        parts.push(wasWereQ);
        parts.push(subject.toLowerCase());
        parts.push(verb.ing);
        sentence = `${wasWereQ} ${subject.toLowerCase()} ${verb.ing}`;
      }
    }

    return { parts, sentence };
  }

  clearDrill() {
    const input = document.getElementById('drill-input');
    input.value = '';
    input.className = 'drill-input';
    input.disabled = false;
    input.focus();
    document.getElementById('drill-result').classList.remove('show', 'correct', 'incorrect');
  }

  checkDrillInput() {
    const input = document.getElementById('drill-input');
    const userAnswer = input.value.trim();
    const correctAnswer = this.currentDrill.correctSentence;

    // Check if correct (case insensitive)
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      input.classList.add('correct');
      input.disabled = true;

      const result = document.getElementById('drill-result');
      const resultSentence = document.getElementById('result-sentence');
      const resultFeedback = document.getElementById('result-feedback');

      result.classList.remove('incorrect');
      result.classList.add('show', 'correct');
      resultSentence.textContent = '✓ ' + userAnswer;
      resultFeedback.textContent = 'Perfect!';

      this.drillCount++;
      document.getElementById('drill-count').textContent = this.drillCount;
      this.playCorrectSound();

      // Auto-move to next after 600ms
      setTimeout(() => {
        this.generateDrill();
      }, 600);
    }
  }

  checkDrill() {
    const input = document.getElementById('drill-input');
    const userAnswer = input.value.trim();
    const correctAnswer = this.currentDrill.correctSentence;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    input.disabled = true;

    const result = document.getElementById('drill-result');
    const resultSentence = document.getElementById('result-sentence');
    const resultFeedback = document.getElementById('result-feedback');

    result.classList.remove('correct', 'incorrect');
    result.classList.add('show', isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      resultSentence.textContent = '✓ ' + userAnswer;
      resultFeedback.textContent = 'Perfect!';
      this.drillCount++;
      document.getElementById('drill-count').textContent = this.drillCount;
      this.playCorrectSound();

      // Auto-move to next after 600ms
      setTimeout(() => {
        this.generateDrill();
      }, 600);
    } else {
      resultSentence.textContent = '✗ ' + userAnswer;
      resultFeedback.textContent = 'Correct: ' + correctAnswer;
      this.playWrongSound();

      // Show next button only when wrong
      document.getElementById('drill-check').style.display = 'none';
      document.getElementById('drill-next').style.display = 'flex';
    }
  }

  nextDrill() {
    this.generateDrill();
  }

  // ==================== TEST MODE ====================

  generateTest() {
    const tenseKeys = this.testFilter === 'all' ? Object.keys(tenseConfig) : [this.testFilter];
    const tenseKey = this.getRandomItem(tenseKeys);
    const tense = tenseConfig[tenseKey];

    const forms = ['positive', 'negative', 'question'];
    const form = this.getRandomItem(forms);

    const verb = this.getRandomItem(verbs);
    const subjectType = this.getRandomItem(Object.keys(subjects));
    const subject = this.getRandomItem(subjects[subjectType]);
    const timeExp = this.getRandomItem(timeExpressions[tenseKey]);

    const correctAnswer = tense.rules[form][subjectType](verb, subject);

    this.currentTest = {
      tenseKey,
      tense,
      form,
      verb,
      subject,
      subjectType,
      timeExp,
      correctAnswer
    };

    // Update UI
    const badge = document.getElementById('test-tense-badge');
    badge.innerHTML = `<span class="tense-icon">${tense.icon}</span><span class="tense-name">${tense.name}</span>`;
    badge.style.background = tense.color;

    const formBadge = document.getElementById('test-form-badge');
    formBadge.textContent = form === 'positive' ? 'Positive (+)' : form === 'negative' ? 'Negative (−)' : 'Question (?)';
    formBadge.className = `form-badge ${form}`;

    const sentence = document.getElementById('test-sentence');
    const subjectEl = sentence.querySelector('.subject');
    const restEl = sentence.querySelector('.rest');

    subjectEl.textContent = form === 'question' ? '' : subject;
    restEl.textContent = form === 'question' ? timeExp + '?' : timeExp + '.';

    document.getElementById('test-verb-hint').textContent = verb.base;

    // Reset
    const input = document.getElementById('test-input');
    input.value = '';
    input.className = 'blank-input';
    input.disabled = false;
    input.focus();

    document.getElementById('test-feedback').classList.remove('show', 'error');
    document.getElementById('test-check').style.display = 'flex';
    document.getElementById('test-next').style.display = 'none';
  }

  checkTest() {
    const input = document.getElementById('test-input');
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = this.currentTest.correctAnswer.toLowerCase();

    const isCorrect = userAnswer === correctAnswer;

    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    input.disabled = true;

    const feedback = document.getElementById('test-feedback');
    feedback.querySelector('.feedback-icon').textContent = isCorrect ? '✓' : '✗';
    document.getElementById('test-correct-answer').textContent = this.currentTest.correctAnswer;
    feedback.classList.remove('error');
    if (!isCorrect) feedback.classList.add('error');
    feedback.classList.add('show');

    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      this.stats.score += 10 + this.stats.streak * 2;
      this.playCorrectSound();

      if (this.stats.streak % 5 === 0) {
        this.celebrate();
        this.showAchievement(`🔥 ${this.stats.streak} in a row!`);
      }
    } else {
      this.stats.streak = 0;
      this.playWrongSound();
    }

    this.updateTestStats();
    this.saveStats();

    document.getElementById('test-check').style.display = 'none';
    document.getElementById('test-next').style.display = 'flex';
  }

  nextTest() {
    this.generateTest();
  }

  updateTestStats() {
    document.getElementById('correct-count').textContent = this.stats.correct;
    document.getElementById('streak-count').textContent = this.stats.streak;
    document.getElementById('score-count').textContent = this.stats.score;
  }

  // ==================== UTILITIES ====================

  getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  showAchievement(text) {
    const popup = document.getElementById('achievement');
    popup.querySelector('.achievement-text').textContent = text;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 3000);
  }

  celebrate() {
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }

  playCorrectSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playWrongSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  saveStats() {
    localStorage.setItem('tenseMaster_stats', JSON.stringify(this.stats));
  }

  loadStats() {
    try {
      const saved = localStorage.getItem('tenseMaster_stats');
      if (saved) {
        this.stats = { ...this.stats, ...JSON.parse(saved) };
      }
    } catch (e) {}
  }
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TenseMaster();
});
