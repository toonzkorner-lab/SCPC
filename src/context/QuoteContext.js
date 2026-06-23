'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [quoteItems, setQuoteItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('scpc_quote_cart');
    if (saved) {
      try {
        setQuoteItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse quote cart', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('scpc_quote_cart', JSON.stringify(quoteItems));
    }
  }, [quoteItems, isLoaded]);

  const addToQuote = (product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromQuote = (productId) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setQuoteItems((prev) => prev.map((item) => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <QuoteContext.Provider value={{ quoteItems, addToQuote, removeFromQuote, updateQuantity, clearQuote, isLoaded }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
