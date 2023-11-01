import tips from './Tips';

export const randomChallenge = () => {
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
};

