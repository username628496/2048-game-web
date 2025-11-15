import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is 2048 game?",
      answer: "2048 is a popular single-player sliding tile puzzle game. The objective is to slide numbered tiles on a 4x4 grid to combine them and create a tile with the number 2048. The game continues even after reaching 2048, allowing you to achieve higher scores with tiles like 4096, 8192, and beyond!"
    },
    {
      question: "How do you play 2048?",
      answer: "Use arrow keys (or swipe on mobile) to move tiles in four directions: up, down, left, or right. When two tiles with the same number touch, they merge into one tile with double the value. After each move, a new tile (2 or 4) appears randomly on the board. The game ends when the board is full and no more moves are possible."
    },
    {
      question: "What are the best strategies to win 2048?",
      answer: "Here are proven strategies: 1) Keep your highest tile in a corner (usually bottom-right or bottom-left). 2) Build tiles in descending order next to your highest tile. 3) Avoid moving your highest tile from its corner. 4) Focus on combining smaller tiles first. 5) Try to maintain rows or columns organized by value. 6) Don't make random moves - think ahead and plan your strategy."
    },
    {
      question: "Can I play 2048 offline?",
      answer: "Yes! Our 2048 game is a Progressive Web App (PWA). Once you visit the game, it will be cached on your device, allowing you to play offline anytime. Your scores and game progress are saved locally on your device, so you never lose your progress even without an internet connection."
    },
    {
      question: "Is 2048 game free to play?",
      answer: "Absolutely! Our 2048 game is completely free to play with no hidden costs, subscriptions, or in-app purchases. You get full access to all features including unlimited games, score tracking, power-ups, and theme customization at no cost."
    },
    {
      question: "What happens when I reach 2048?",
      answer: "Congratulations! When you reach the 2048 tile, you've achieved the primary goal of the game. However, the game doesn't end there - you can choose to continue playing to reach even higher tiles like 4096, 8192, 16384, and beyond. Many players aim for the highest possible score and largest tile they can create."
    },
    {
      question: "How is the score calculated in 2048?",
      answer: "Your score increases each time you merge tiles. The points you earn equal the value of the newly created tile. For example, merging two 2s gives you 4 points, merging two 4s gives you 8 points, and so on. Your best score is automatically saved and displayed, allowing you to track your progress and try to beat your personal record."
    },
    {
      question: "Can I undo moves in 2048?",
      answer: "Yes! Our version includes an undo power-up feature that allows you to reverse your last move. This is especially helpful when you accidentally make a move that disrupts your strategy. Use the undo button wisely as it has limited uses per game."
    },
    {
      question: "What power-ups are available in this 2048 game?",
      answer: "Our enhanced version offers several power-ups to help you achieve higher scores: Undo (reverse your last move), Shuffle (reorganize tiles randomly when stuck), and Remove Tile (eliminate a specific tile). These power-ups add strategic depth and can help you recover from difficult situations or break through challenging board states."
    },
    {
      question: "Does 2048 work on mobile devices?",
      answer: "Yes! Our 2048 game is fully optimized for mobile devices including smartphones and tablets. You can play using touch gestures (swipe in any direction to move tiles). The game works seamlessly on iOS (iPhone/iPad), Android devices, and all modern mobile browsers. The responsive design ensures a great experience on any screen size."
    },
    {
      question: "Can I install 2048 as an app on my phone?",
      answer: "Yes! As a Progressive Web App (PWA), you can install 2048 directly to your home screen without going through an app store. On mobile browsers, tap the 'Add to Home Screen' option in your browser menu. The game will install like a native app with its own icon, and you can launch it directly from your home screen with full offline support."
    },
    {
      question: "Are my scores and game progress saved?",
      answer: "Yes, all your game data is automatically saved locally on your device using browser storage. This includes your best score, current game state, power-up usage, and preferences. Your data persists even if you close the browser or play offline. However, clearing your browser data will reset your saved progress."
    }
  ];

  // Generate FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="faq-container">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about playing 2048 game</p>
      </div>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              className="faq-answer"
              style={{
                maxHeight: openIndex === index ? '500px' : '0',
                opacity: openIndex === index ? '1' : '0'
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <p>Still have questions? The best way to learn is to start playing!
           <a href="/" className="play-link"> Play 2048 Now</a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
