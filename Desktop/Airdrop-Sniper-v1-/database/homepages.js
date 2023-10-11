const homepages = new Schema(
  {
    favorite: { type: String, default: "Your Favorite Coin Missing?" },
    favoritealtad: {
      type: String,
      default:
        "Cant find your coin? List your favorite coin now!Get your community to vote for your coin and gain exposure.",
    },
    newlist: { type: String, default: "View New Listings" },
    newlistaltad: {
      type: String,
      default:
        "Click the button below to view the New Listings! These coins were just submitted.",
    },
    altbaslik: {
      type: String,
      default: "Find the best new cryptocurrency projects",
    },
    altad: {
      type: String,
      default:
        "Did ever you wonder where people find the best new cryptocurrency projects, coins and tokens like Doge and Shiba Inu? They use websites like local.net. Cryptocurrency projects are listed here before CoinMarketCap, CoinGecko and major exchanges. Find the best crypto moonshots on our website. However: before investing always do your own research (DYOR)! Listing on test.com does NOT mean we endorse the project, they could be scams. Be careful with your investments.",
    },
    biralt: { type: String, default: "How does localhost work?" },
    biraltad: {
      type: String,
      default:
        'New cryptocurrency projects can be listed Applying Here. Once applied, they instantly become visible on the New Listings Page. New listings require 500 votes to be officially listed in our top list. After that, anyone can see and vote for the project. Get your community to vote on your project, because votes matter! Our ranking is simple: the highest votes is #1 on our website. The project will get exposure with all our visitors! Note on voting: Unique votes only count once for the "All Time" page, but can count every 24 hours on the "Today" page.',
    },
  },
  { collection: "homepages" },
);

module.exports = mongoDB.model("homepages", homepages);
