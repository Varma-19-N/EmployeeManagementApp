/**
 * Service for generating personalized greetings and managing greeting logic.
 */
angular.module('form2Module')
  .service('greetingService', function() {
    
    // Different types of greetings
    const greetingTypes = {
      friendly: [
        "Hello there, {name}! Hope you're having a wonderful day!",
        "Hi {name}! It's great to see you here!",
        "Hey {name}! Welcome back, friend!",
        "Greetings {name}! You're looking fantastic today!",
        "Hello {name}! Ready for something amazing?"
      ],
      professional: [
        "Good day, {name}. Welcome to our platform.",
        "Hello {name}, we're pleased to have you here.",
        "Greetings {name}. Thank you for joining us.",
        "Welcome {name}. We hope you find everything you need.",
        "Hello {name}. We're here to assist you today."
      ],
      casual: [
        "Hey {name}! What's up?",
        "Yo {name}! How's it going?",
        "Hi there {name}! Nice to see ya!",
        "What's good, {name}?",
        "Hey {name}! Hope you're doing well!"
      ],
      motivational: [
        "Hello {name}! You're capable of amazing things!",
        "Hi {name}! Today is full of possibilities!",
        "Greetings {name}! You've got this!",
        "Hello {name}! Make today count!",
        "Hey {name}! Believe in yourself!"
      ]
    };

    const timeBasedGreetings = {
      morning: "Good morning",
      afternoon: "Good afternoon", 
      evening: "Good evening",
      night: "Good night"
    };

    /**
     * Gets the current time period for time-based greetings
     */
    this.getCurrentTimePeriod = function() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'morning';
      if (hour >= 12 && hour < 17) return 'afternoon';
      if (hour >= 17 && hour < 22) return 'evening';
      return 'night';
    };

    /**
     * Generates a personalized greeting based on user preferences
     */
    this.generateGreeting = function(userName, greetingType, includeTimeGreeting) {
      if (!userName || userName.trim() === '') {
        return this.getGenericGreeting();
      }

      let greeting = '';
      
      // Add time-based greeting if requested
      if (includeTimeGreeting) {
        const timePeriod = this.getCurrentTimePeriod();
        greeting = timeBasedGreetings[timePeriod] + ', ';
      }

      // Get random greeting from selected type
      const greetings = greetingTypes[greetingType] || greetingTypes.friendly;
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      
      // Replace {name} placeholder with actual name
      greeting += randomGreeting.replace('{name}', userName);

      return greeting;
    };

    /**
     * Gets a generic greeting when no name is provided
     */
    this.getGenericGreeting = function() {
      const timePeriod = this.getCurrentTimePeriod();
      const genericMessages = [
        `${timeBasedGreetings[timePeriod]}! Welcome to our platform!`,
        `${timeBasedGreetings[timePeriod]}! Great to have you here!`,
        `${timeBasedGreetings[timePeriod]}! Hope you're doing well!`,
        `${timeBasedGreetings[timePeriod]}! Ready to get started?`
      ];
      
      return genericMessages[Math.floor(Math.random() * genericMessages.length)];
    };

    /**
     * Gets available greeting types
     */
    this.getGreetingTypes = function() {
      return Object.keys(greetingTypes);
    };

    /**
     * Gets a motivational quote
     */
    this.getMotivationalQuote = function() {
      const quotes = [
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "Your limitation—it's only your imagination.",
        "Push yourself, because no one else is going to do it for you.",
        "Great things never come from comfort zones.",
        "Dream it. Wish it. Do it.",
        "Success doesn't just find you. You have to go out and get it.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "Don't stop when you're tired. Stop when you're done.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Do something today that your future self will thank you for."
      ];
      
      return quotes[Math.floor(Math.random() * quotes.length)];
    };

    /**
     * Gets current date and time formatted nicely
     */
    this.getCurrentDateTime = function() {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return now.toLocaleDateString('en-US', options);
    };

    /**
     * Generates a fun fact
     */
    this.getFunFact = function() {
      const facts = [
        "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old!",
        "Fun fact: A group of flamingos is called a 'flamboyance'!",
        "Interesting: Bananas are berries, but strawberries aren't!",
        "Cool fact: Octopuses have three hearts and blue blood!",
        "Amazing: A single cloud can weigh more than a million pounds!",
        "Wow: Butterflies taste with their feet!",
        "Incredible: A shrimp's heart is in its head!",
        "Fascinating: Wombat poop is cube-shaped!",
        "Surprising: A group of pandas is called an 'embarrassment'!",
        "Mind-blowing: There are more possible games of chess than atoms in the observable universe!"
      ];
      
      return facts[Math.floor(Math.random() * facts.length)];
    };
  });