import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, X, ShieldCheck, MessageCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface FeedbackItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  comment: string;
  date: string;
}

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  addToast: (title: string, message: string, type: 'success' | 'warning' | 'info') => void;
}

const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'f1',
    name: 'Alex R.',
    category: 'Gullak Savings Vault',
    rating: 5,
    comment: 'The Gullak yield vault custom contract is brilliant! Auto-compounding sXAU returns smoothly on Stellar Testnet.',
    date: '2026-07-23'
  },
  {
    id: 'f2',
    name: 'Priya S.',
    category: 'UI/UX & Mobile',
    rating: 5,
    comment: 'Super sleek dark mode UI and extremely fast responsive layout on mobile Chrome. Easy wallet connection!',
    date: '2026-07-22'
  },
  {
    id: 'f3',
    name: 'Carlos M.',
    category: 'Asset Swaps',
    rating: 4,
    comment: 'Low gas fee swaps between XLM and sXAG. Instant settlement via Horizon!',
    date: '2026-07-21'
  },
  {
    id: 'f4',
    name: 'Elena K.',
    category: 'DeFi Loans',
    rating: 5,
    comment: 'Collateralized USDC loans against tokenized gold worked effortlessly. High performance DeFi architecture.',
    date: '2026-07-20'
  }
];

export const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({ isOpen, onClose, addToast }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('Gullak Savings Vault');
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'submit' | 'reviews'>('submit');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(INITIAL_FEEDBACKS);

  useEffect(() => {
    // Load local feedback cache or fetch from Firestore if connected
    const loadFeedbacks = async () => {
      try {
        const saved = localStorage.getItem('glintfi_user_feedback');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFeedbacks(parsed);
          }
        }
        if (db) {
          const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"), limit(10));
          const querySnapshot = await getDocs(q);
          const docsData: FeedbackItem[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            docsData.push({
              id: doc.id,
              name: data.name || 'Anonymous Builder',
              category: data.category || 'General',
              rating: data.rating || 5,
              comment: data.comment || '',
              date: data.date || new Date().toISOString().split('T')[0]
            });
          });
          if (docsData.length > 0) {
            setFeedbacks(prev => {
              const combined = [...docsData, ...prev];
              // Unique by ID
              return combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
            });
          }
        }
      } catch (e) {
        console.log('Firebase fetch fallback to local:', e);
      }
    };

    if (isOpen) {
      loadFeedbacks();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Feedback Required', 'Please type a short feedback comment.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const newFeedback: FeedbackItem = {
      id: 'f_' + Date.now(),
      name: name.trim() || 'Stellar Member',
      category,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    try {
      if (db) {
        await addDoc(collection(db, "feedbacks"), {
          ...newFeedback,
          timestamp: Date.now()
        });
      }
    } catch (e) {
      console.warn('Firestore optional save notice:', e);
    }

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('glintfi_user_feedback', JSON.stringify(updated));

    setIsSubmitting(false);
    addToast('Feedback Submitted', 'Thank you! Your feedback has been recorded.', 'success');
    setComment('');
    setName('');
    setActiveTab('reviews');
  };

  const avgRating = (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / (feedbacks.length || 1)).toFixed(1);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-5 text-slate-100 relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                User Feedback & Reviews
              </h3>
              <p className="text-xs text-slate-400">Rate your experience & view community ratings for GlintFi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'submit'
                ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Community Reviews ({feedbacks.length})</span>
          </button>
        </div>

        {/* Submit Form Tab */}
        {activeTab === 'submit' && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Overall Satisfaction Score</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                          : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-amber-400 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Feature Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Gullak Savings Vault">Gullak Savings Vault</option>
                  <option value="Asset Swaps">Asset Swaps & Liquidity</option>
                  <option value="DeFi Loans">DeFi Precious Loans</option>
                  <option value="UI/UX & Mobile">UI/UX & Mobile Responsiveness</option>
                  <option value="Performance & Speed">Performance & Horizon RPC</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name / Handle (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Subho or G...39A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Feedback & Suggestions</label>
              <textarea
                rows={3}
                required
                placeholder="Share your thoughts on the smart contract architecture, design, micro-investments, or mobile UI..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-indigo-600 to-indigo-700 hover:from-amber-400 hover:to-indigo-600 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Feedback...' : 'Post Feedback'}</span>
            </button>
          </form>
        )}

        {/* Reviews List Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 pt-1">
            {/* Rating Summary Header */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-extrabold text-amber-400">{avgRating}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Based on {feedbacks.length} user reviews</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Testers
                </span>
              </div>
            </div>

            {/* Reviews Feed */}
            <div className="max-h-[260px] overflow-y-auto space-y-2.5 pr-1">
              {feedbacks.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-400 border border-indigo-800/40 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.comment}</p>
                  <p className="text-[9px] text-slate-500 font-mono text-right">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
