"use client";

import { useState } from "react";
import { pipeline } from "@huggingface/transformers";

type Article = {
  title: string;
  url: string;
  source: string;
  publishedDate: string;
  country: string;
  language: string;
};

type SentimentResult = {
  label: string;
  score: number;
};

let sentimentClassifier: any = null;

const riskKeywords = [
  "risk",
  "lawsuit",
  "investigation",
  "decline",
  "shortage",
  "delay",
  "loss",
  "layoff",
  "recall",
  "regulation",
  "uncertainty",
  "ban",
  "sanction",
  "warning",
  "slump",
  "slowdown",
  "concern",
  "pressure",
];

const opportunityKeywords = [
  "growth",
  "investment",
  "partnership",
  "expansion",
  "approval",
  "innovation",
  "profit",
  "demand",
  "launch",
  "funding",
  "adoption",
  "record",
  "surge",
  "breakthrough",
  "upgrade",
  "deal",
];

const themeGroups = {
  Regulation: ["regulation", "law", "policy", "government", "ban", "sanction"],
  Growth: ["growth", "demand", "revenue", "profit", "expansion", "record"],
  Competition: ["competition", "rival", "competitor", "market share"],
  Innovation: ["ai", "technology", "innovation", "launch", "product"],
  Risk: ["risk", "uncertainty", "lawsuit", "investigation", "shortage"],
  Investment: ["investment", "funding", "capex", "spending", "partnership"],
};

export default function MarketSignalMonitor() {
  const [topic, setTopic] = useState("Nvidia");
  const [articles, setArticles] = useState<Article[]>([]);
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeMarket = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setModelLoading(false);
    setError("");
    setArticles([]);
    setSentiment(null);

    try {
      const response = await fetch(
        `/api/market-signals?topic=${encodeURIComponent(topic)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Unable to fetch market signals");
      }

      const fetchedArticles: Article[] = data.articles || [];

      if (fetchedArticles.length === 0) {
        throw new Error("No articles found for this topic. Try a broader search term.");
      }

      setArticles(fetchedArticles);

      setModelLoading(true);

      if (!sentimentClassifier) {
        sentimentClassifier = await pipeline(
          "sentiment-analysis",
          "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
        );
      }

      const combinedText = fetchedArticles
        .slice(0, 12)
        .map((article) => article.title)
        .join(". ")
        .slice(0, 1500);

      const output = await sentimentClassifier(combinedText);
      setSentiment(output[0]);

      setModelLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      setModelLoading(false);
    }
  };

  const combinedTitles = articles.map((article) => article.title.toLowerCase()).join(" ");

  const detectedRiskWords = riskKeywords.filter((word) =>
    combinedTitles.includes(word)
  );

  const detectedOpportunityWords = opportunityKeywords.filter((word) =>
    combinedTitles.includes(word)
  );

  const riskCount = detectedRiskWords.length;
  const opportunityCount = detectedOpportunityWords.length;

  const detectedThemes = Object.entries(themeGroups)
    .map(([theme, keywords]) => ({
      theme,
      count: keywords.filter((word) => combinedTitles.includes(word)).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);

  const marketTone =
    sentiment?.label === "POSITIVE" && opportunityCount >= riskCount
      ? "Positive / Opportunity-Led"
      : sentiment?.label === "NEGATIVE" && riskCount > opportunityCount
      ? "Cautious / Risk-Heavy"
      : "Mixed / Watchlist";

  const researchQuestions =
    marketTone === "Positive / Opportunity-Led"
      ? [
          "What demand drivers are creating positive momentum?",
          "Which companies or segments are best positioned to benefit?",
          "Are growth expectations already reflected in the market narrative?",
        ]
      : marketTone === "Cautious / Risk-Heavy"
      ? [
          "Which risks appear most frequently across recent coverage?",
          "Are these risks temporary disruptions or structural concerns?",
          "What signals would indicate market sentiment is improving?",
        ]
      : [
          "Which signals are positive versus negative?",
          "What themes need deeper validation?",
          "Is the market narrative shifting or still uncertain?",
        ];

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          AI Market Signal Monitor
        </h2>

        <p className="mt-3 max-w-3xl text-gray-400">
          Analyze public news signals and use browser-based AI sentiment to identify
          market tone, risks, opportunities, themes, and follow-up research questions.
        </p>
      </div>

      <div className="mt-8">
        <label className="text-sm font-medium text-gray-300">
          Topic / Company / Market
        </label>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: Nvidia, AI chips, Tesla, cybersecurity"
          className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
        />
      </div>

      <button
        onClick={analyzeMarket}
        disabled={loading || modelLoading}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
      >
        {loading
          ? "Fetching market signals..."
          : modelLoading
          ? "Loading browser AI model..."
          : "Analyze Market Signals"}
      </button>

      {error && (
        <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-300">
          {error}
        </div>
      )}

      {articles.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Market Tone</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {marketTone}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Articles Analyzed</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {articles.length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">AI Sentiment Confidence</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {sentiment ? `${(sentiment.score * 100).toFixed(1)}%` : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Risk Signals
              </h3>

              <p className="mt-3 text-gray-400">
                Detected {riskCount} risk-oriented signals across recent coverage.
              </p>

              <ul className="mt-4 space-y-2 text-gray-300">
                {detectedRiskWords.length > 0 ? (
                  detectedRiskWords.slice(0, 8).map((word) => (
                    <li key={word}>• {word}</li>
                  ))
                ) : (
                  <li className="text-gray-500">No major risk keywords detected.</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Opportunity Signals
              </h3>

              <p className="mt-3 text-gray-400">
                Detected {opportunityCount} opportunity-oriented signals across recent coverage.
              </p>

              <ul className="mt-4 space-y-2 text-gray-300">
                {detectedOpportunityWords.length > 0 ? (
                  detectedOpportunityWords.slice(0, 8).map((word) => (
                    <li key={word}>• {word}</li>
                  ))
                ) : (
                  <li className="text-gray-500">
                    No major opportunity keywords detected.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-xl font-semibold text-white">
              Top Detected Themes
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {detectedThemes.length > 0 ? (
                detectedThemes.map((item) => (
                  <span
                    key={item.theme}
                    className="rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-gray-300"
                  >
                    {item.theme}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No major themes detected.</p>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-xl font-semibold text-white">
              Recommended Follow-Up Questions
            </h3>

            <ul className="mt-4 space-y-3 text-gray-300">
              {researchQuestions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="font-semibold text-white">Methodology</h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              This tool retrieves recent public news articles, analyzes article
              headlines using a browser-based sentiment model, and applies signal
              logic to identify risk terms, opportunity terms, and recurring market
              themes. It is intended for market research and narrative monitoring,
              not investment advice.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">
            <h3 className="text-xl font-semibold text-white">
              References / Source Articles
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Source links used to generate the market signal analysis.
            </p>

            <div className="mt-5 space-y-3">
              {articles.slice(0, 10).map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-gray-800 bg-gray-900 p-4 transition hover:border-gray-600"
                >
                  <p className="font-medium text-white">{article.title}</p>

                  <p className="mt-2 text-sm text-gray-500">
                    {article.source} • {article.publishedDate}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}