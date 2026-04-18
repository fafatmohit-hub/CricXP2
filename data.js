export const PLAYERS_POOL = [
  { id: 1,  name: 'Virat Kohli',       role: 'Batsman',      rating: 95, country: '🇮🇳', avatar: 'VK' },
  { id: 2,  name: 'Rohit Sharma',      role: 'Batsman',      rating: 92, country: '🇮🇳', avatar: 'RS' },
  { id: 3,  name: 'Jasprit Bumrah',    role: 'Bowler',       rating: 94, country: '🇮🇳', avatar: 'JB' },
  { id: 4,  name: 'MS Dhoni',          role: 'Wicketkeeper', rating: 90, country: '🇮🇳', avatar: 'MD' },
  { id: 5,  name: 'Ravindra Jadeja',   role: 'All-Rounder',  rating: 88, country: '🇮🇳', avatar: 'RJ' },
  { id: 6,  name: 'Hardik Pandya',     role: 'All-Rounder',  rating: 86, country: '🇮🇳', avatar: 'HP' },
  { id: 7,  name: 'Rishabh Pant',      role: 'Wicketkeeper', rating: 88, country: '🇮🇳', avatar: 'RP' },
  { id: 8,  name: 'Suryakumar Yadav',  role: 'Batsman',      rating: 87, country: '🇮🇳', avatar: 'SY' },
  { id: 9,  name: 'Ben Stokes',        role: 'All-Rounder',  rating: 91, country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'BS' },
  { id: 10, name: 'Joe Root',          role: 'Batsman',      rating: 93, country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'JR' },
  { id: 11, name: 'James Anderson',    role: 'Bowler',       rating: 89, country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', avatar: 'JA' },
  { id: 12, name: 'Pat Cummins',       role: 'Bowler',       rating: 92, country: '🇦🇺', avatar: 'PC' },
  { id: 13, name: 'Steve Smith',       role: 'Batsman',      rating: 91, country: '🇦🇺', avatar: 'SS' },
  { id: 14, name: 'David Warner',      role: 'Batsman',      rating: 88, country: '🇦🇺', avatar: 'DW' },
  { id: 15, name: 'Mitchell Starc',    role: 'Bowler',       rating: 87, country: '🇦🇺', avatar: 'MS' },
  { id: 16, name: 'Babar Azam',        role: 'Batsman',      rating: 90, country: '🇵🇰', avatar: 'BA' },
  { id: 17, name: 'Shaheen Afridi',    role: 'Bowler',       rating: 88, country: '🇵🇰', avatar: 'SA' },
  { id: 18, name: 'Kane Williamson',   role: 'Batsman',      rating: 89, country: '🇳🇿', avatar: 'KW' },
  { id: 19, name: 'Trent Boult',       role: 'Bowler',       rating: 86, country: '🇳🇿', avatar: 'TB' },
  { id: 20, name: 'Quinton de Kock',   role: 'Wicketkeeper', rating: 87, country: '🇿🇦', avatar: 'QD' },
  { id: 21, name: 'Kagiso Rabada',     role: 'Bowler',       rating: 89, country: '🇿🇦', avatar: 'KR' },
  { id: 22, name: 'Shakib Al Hasan',   role: 'All-Rounder',  rating: 85, country: '🇧🇩', avatar: 'SH' },
  { id: 23, name: 'Shreyas Iyer',      role: 'Batsman',      rating: 84, country: '🇮🇳', avatar: 'SI' },
  { id: 24, name: 'Mohammed Siraj',    role: 'Bowler',       rating: 85, country: '🇮🇳', avatar: 'MSI' },
];

export const ROLE_COLORS = {
  Batsman:      { bg: 'rgba(34,211,238,0.12)',  text: '#22d3ee' },
  Bowler:       { bg: 'rgba(249,115,22,0.12)',  text: '#f97316' },
  'All-Rounder':{ bg: 'rgba(167,139,250,0.12)', text: '#a78bfa' },
  Wicketkeeper: { bg: 'rgba(52,211,153,0.12)',  text: '#34d399' },
};

export const LEAGUE_MATCHES = [
  { id: 1, team1: 'Mumbai Indians',      team2: 'Chennai Super Kings',   date: 'Apr 18, 2026', time: '7:30 PM', venue: 'Wankhede Stadium',          city: 'Mumbai' },
  { id: 2, team1: 'Royal Challengers',   team2: 'Delhi Capitals',        date: 'Apr 20, 2026', time: '3:30 PM', venue: 'M Chinnaswamy Stadium',      city: 'Bengaluru' },
  { id: 3, team1: 'Kolkata Knight Riders',team2: 'Punjab Kings',         date: 'Apr 22, 2026', time: '7:30 PM', venue: 'Eden Gardens',               city: 'Kolkata' },
  { id: 4, team1: 'Rajasthan Royals',    team2: 'Sunrisers Hyderabad',   date: 'Apr 24, 2026', time: '7:30 PM', venue: 'Sawai Mansingh Stadium',     city: 'Jaipur' },
  { id: 5, team1: 'Gujarat Titans',      team2: 'Lucknow Super Giants',  date: 'Apr 26, 2026', time: '3:30 PM', venue: 'Narendra Modi Stadium',      city: 'Ahmedabad' },
  { id: 6, team1: 'Mumbai Indians',      team2: 'Royal Challengers',     date: 'Apr 28, 2026', time: '7:30 PM', venue: 'Wankhede Stadium',          city: 'Mumbai' },
];

export const COUPONS = [
  { id: 1, title: 'Swiggy ₹200 Off',      brand: 'Swiggy',      points: 500,  color: '#FF6B35', icon: '🍔', description: '₹200 off on orders above ₹599' },
  { id: 2, title: 'Zomato Free Delivery', brand: 'Zomato',      points: 300,  color: '#E23744', icon: '🛵', description: 'Free delivery on next 5 orders' },
  { id: 3, title: 'Amazon ₹500 Voucher',  brand: 'Amazon',      points: 1200, color: '#FF9900', icon: '📦', description: '₹500 gift card for any purchase' },
  { id: 4, title: 'Netflix 1 Month',      brand: 'Netflix',     points: 2000, color: '#E50914', icon: '🎬', description: '1 month free Netflix subscription' },
  { id: 5, title: 'Myntra ₹300 Off',      brand: 'Myntra',      points: 700,  color: '#FF3F6C', icon: '👗', description: '₹300 off on fashion above ₹999' },
  { id: 6, title: 'Ola ₹100 Off',         brand: 'Ola',         points: 250,  color: '#1CBF73', icon: '🚕', description: '₹100 off on next 3 rides' },
  { id: 7, title: 'Hotstar Premium',       brand: 'Hotstar',     points: 1500, color: '#1C59CE', icon: '⭐', description: '1 month Hotstar Premium access' },
  { id: 8, title: 'BookMyShow ₹150',       brand: 'BookMyShow', points: 400,  color: '#BF1E2E', icon: '🎟️', description: '₹150 off on movie tickets' },
  { id: 9, title: 'Nykaa ₹200 Off',        brand: 'Nykaa',      points: 450,  color: '#FC2779', icon: '💄', description: '₹200 off on beauty products' },
  { id: 10,title: 'Flipkart ₹400 Off',     brand: 'Flipkart',   points: 950,  color: '#2874F0', icon: '🛒', description: '₹400 off on electronics above ₹1999' },
];

export const FAKE_LEADERBOARD = [
  { name: 'RohitFan99',    avatar: 'RF', matches: 18, wins: 14, points: 4200 },
  { name: 'CricketKing',   avatar: 'CK', matches: 15, wins: 11, points: 3600 },
  { name: 'SixerMachine',  avatar: 'SM', matches: 20, wins: 13, points: 3100 },
  { name: 'BoundaryHunter',avatar: 'BH', matches: 12, wins: 9,  points: 2800 },
  { name: 'WicketWizard',  avatar: 'WW', matches: 16, wins: 10, points: 2500 },
  { name: 'SpinKing',      avatar: 'SK', matches: 10, wins: 7,  points: 1900 },
  { name: 'PaceBowler',    avatar: 'PB', matches: 8,  wins: 4,  points: 1200 },
];
