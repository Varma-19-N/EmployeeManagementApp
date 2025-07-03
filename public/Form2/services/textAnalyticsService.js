/**
 * Service for performing text analytics operations.
 * Provides comprehensive text analysis including sentiment, complexity, and statistics.
 */
angular.module('form2Module')
  .service('textAnalyticsService', function() {
    
    // Positive and negative word lists for sentiment analysis
    const positiveWords = [
      'amazing', 'awesome', 'brilliant', 'excellent', 'fantastic', 'great', 'happy',
      'incredible', 'love', 'perfect', 'wonderful', 'good', 'best', 'beautiful',
      'outstanding', 'superb', 'marvelous', 'delightful', 'pleasant', 'positive'
    ];
    
    const negativeWords = [
      'awful', 'bad', 'terrible', 'horrible', 'hate', 'worst', 'disgusting',
      'disappointing', 'sad', 'angry', 'frustrated', 'annoying', 'boring',
      'difficult', 'problem', 'issue', 'wrong', 'failed', 'broken', 'negative'
    ];

    /**
     * Analyzes the provided text and returns comprehensive analytics.
     * @param {string} text - The text to analyze
     * @returns {Object} Analytics object with various metrics
     */
    this.analyzeText = function(text) {
      if (!text || text.trim() === '') {
        return this.getEmptyAnalytics();
      }

      const cleanText = text.trim();
      
      return {
        characterCount: this.getCharacterCount(cleanText),
        characterCountNoSpaces: this.getCharacterCountNoSpaces(cleanText),
        wordCount: this.getWordCount(cleanText),
        sentenceCount: this.getSentenceCount(cleanText),
        paragraphCount: this.getParagraphCount(cleanText),
        averageWordsPerSentence: this.getAverageWordsPerSentence(cleanText),
        readingTimeMinutes: this.getReadingTime(cleanText),
        sentiment: this.analyzeSentiment(cleanText),
        complexity: this.analyzeComplexity(cleanText),
        topWords: this.getTopWords(cleanText),
        languageDetection: this.detectLanguage(cleanText)
      };
    };

    /**
     * Returns empty analytics structure
     */
    this.getEmptyAnalytics = function() {
      return {
        characterCount: 0,
        characterCountNoSpaces: 0,
        wordCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        averageWordsPerSentence: 0,
        readingTimeMinutes: 0,
        sentiment: { score: 0, label: 'Neutral', confidence: 0 },
        complexity: { level: 'Simple', score: 0 },
        topWords: [],
        languageDetection: 'English'
      };
    };

    /**
     * Counts total characters including spaces
     */
    this.getCharacterCount = function(text) {
      return text.length;
    };

    /**
     * Counts characters excluding spaces
     */
    this.getCharacterCountNoSpaces = function(text) {
      return text.replace(/\s/g, '').length;
    };

    /**
     * Counts words in the text
     */
    this.getWordCount = function(text) {
      return text.split(/\s+/).filter(word => word.length > 0).length;
    };

    /**
     * Counts sentences in the text
     */
    this.getSentenceCount = function(text) {
      return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    };

    /**
     * Counts paragraphs in the text
     */
    this.getParagraphCount = function(text) {
      return text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
    };

    /**
     * Calculates average words per sentence
     */
    this.getAverageWordsPerSentence = function(text) {
      const wordCount = this.getWordCount(text);
      const sentenceCount = this.getSentenceCount(text);
      return sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
    };

    /**
     * Estimates reading time in minutes (average 200 words per minute)
     */
    this.getReadingTime = function(text) {
      const wordCount = this.getWordCount(text);
      return Math.ceil(wordCount / 200);
    };

    /**
     * Performs basic sentiment analysis
     */
    this.analyzeSentiment = function(text) {
      const words = text.toLowerCase().split(/\s+/);
      let positiveScore = 0;
      let negativeScore = 0;

      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (positiveWords.includes(cleanWord)) {
          positiveScore++;
        }
        if (negativeWords.includes(cleanWord)) {
          negativeScore++;
        }
      });

      const totalSentimentWords = positiveScore + negativeScore;
      const score = totalSentimentWords > 0 ? 
        Math.round(((positiveScore - negativeScore) / totalSentimentWords) * 100) / 100 : 0;

      let label = 'Neutral';
      let confidence = Math.abs(score);

      if (score > 0.2) {
        label = 'Positive';
      } else if (score < -0.2) {
        label = 'Negative';
      }

      return { score, label, confidence };
    };

    /**
     * Analyzes text complexity based on sentence length and word complexity
     */
    this.analyzeComplexity = function(text) {
      const avgWordsPerSentence = this.getAverageWordsPerSentence(text);
      const words = text.split(/\s+/);
      const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;

      let score = 0;
      
      // Factor in sentence length
      if (avgWordsPerSentence > 20) score += 3;
      else if (avgWordsPerSentence > 15) score += 2;
      else if (avgWordsPerSentence > 10) score += 1;

      // Factor in word length
      if (avgWordLength > 6) score += 2;
      else if (avgWordLength > 4) score += 1;

      let level = 'Simple';
      if (score >= 4) level = 'Complex';
      else if (score >= 2) level = 'Moderate';

      return { level, score };
    };

    /**
     * Gets the most frequently used words
     */
    this.getTopWords = function(text) {
      const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3); // Filter out short words

      const wordCount = {};
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      return Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word, count]) => ({ word, count }));
    };

    /**
     * Basic language detection (simplified)
     */
    this.detectLanguage = function(text) {
      // This is a very basic implementation
      // In a real application, you'd use a proper language detection library
      const commonEnglishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
      const words = text.toLowerCase().split(/\s+/);
      const englishWordCount = words.filter(word => commonEnglishWords.includes(word)).length;
      
      return englishWordCount > words.length * 0.1 ? 'English' : 'Other';
    };
  });