/**
 * Model for text analytics data structure.
 * Defines the default structure for text analysis results.
 */
angular.module('form2Module')
  .constant('textAnalyticsModel', {
    inputText: '',
    analytics: {
      characterCount: 0,
      characterCountNoSpaces: 0,
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      averageWordsPerSentence: 0,
      readingTimeMinutes: 0,
      sentiment: {
        score: 0,
        label: 'Neutral',
        confidence: 0
      },
      complexity: {
        level: 'Simple',
        score: 0
      },
      topWords: [],
      languageDetection: 'English'
    },
    lastAnalyzedAt: null
  });