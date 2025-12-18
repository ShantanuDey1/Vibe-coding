
import React from 'react';

export const ENGLISH_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

export const BENGALI_WORDS = [
  "মানুষ", "পৃথিবী", "ভালোবাসা", "প্রযুক্তি", "শিক্ষা", "সংস্কৃতি", "বন্ধু", "পরিবার", "স্বপ্ন", "জীবন", "সুখ", "শান্তি", "সময়", "দেশ", "মাটি", "আলো", "আকাশ", "বাতাস", "জল", "নদী", "সাগর", "পাহাড়", "বই", "কলম", "গল্প", "কবিতা", "গান", "হাসি", "কান্না", "মন", "হৃদয়", "কাজ", "খেলার", "খাবার", "ঘুম", "সকাল", "দুপুর", "সন্ধ্যা", "রাত", "আজ", "কাল", "ভালো", "মন্দ", "ছোট", "বড়", "নতুন", "পুরানো", "সত্য", "মিথ্যা", "সহজ", "কঠিন"
];

export const CoffeeIllustrations = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
    <div className="absolute top-10 left-10 rotate-12">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    </div>
    <div className="absolute top-1/4 right-20 -rotate-45">
      <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18c.35 1.15 1.45 2 2.65 2 1.28 0 2.47-.88 2.35-2.21-.07-1.11-.93-1.93-1.95-2.21a2.8 2.8 0 0 0-1.05-.14C6.55 15.44 6 16.65 6 18z" />
        <path d="M14 10c.35 1.15 1.45 2 2.65 2 1.28 0 2.47-.88 2.35-2.21-.07-1.11-.93-1.93-1.95-2.21a2.8 2.8 0 0 0-1.05-.14C14.55 7.44 14 8.65 14 10z" />
      </svg>
    </div>
    <div className="absolute bottom-1/4 left-32 rotate-90">
      <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    </div>
    <div className="absolute bottom-10 right-10">
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="M12 22v-2" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M22 12h-2" />
        <path d="m17.66 6.34 1.41-1.41" />
      </svg>
    </div>
  </div>
);
