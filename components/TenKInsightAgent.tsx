"use client";

import { useMemo, useState } from "react";

type FinancialInputs = {
  revenue: number;
  priorRevenue: number;
  operatingIncome: number;
  netIncome: number;
  currentAssets: number;
  currentLiabilities: number;
  totalAssets: number;
  totalLiabilities: number;
  cash: number;
  debt: number;
  operatingCashFlow: number;
  capitalExpenditures: number;
};

const defaultFinancials: FinancialInputs = {
  revenue: 100000,
  priorRevenue: 90000,
  operatingIncome: 15000,
  netIncome: 10000,
  currentAssets: 50000,
  currentLiabilities: 30000,
  totalAssets: 200000,
  totalLiabilities: 120000,
  cash: 25000,
  debt: 60000,
  operatingCashFlow: 18000,
  capitalExpenditures: 5000,
};

const riskKeywords = {
  Competition: ["competition", "competitive", "competitors", "pricing pressure"],
  Regulation: ["regulation", "regulatory", "compliance", "legal", "law"],
  Cybersecurity: ["cybersecurity", "cyber", "data breach", "security incident"],
  Macroeconomic: ["inflation", "interest rates", "recession", "macroeconomic"],
  SupplyChain: ["supply chain", "supplier", "shortage", "logistics"],
  CustomerConcentration: ["customer concentration", "major customer", "largest customer"],
  DebtLiquidity: ["liquidity", "debt", "credit facility", "covenant"],
  International: ["foreign exchange", "international", "geopolitical", "currency"],
};

const opportunityKeywords = {
  Growth: ["growth", "expand", "expansion", "increase", "demand"],
  Innovation: ["innovation", "technology", "platform", "product development"],
  AI: ["artificial intelligence", " AI ", "machine learning", "automation"],
  Margin: ["margin", "operating leverage", "efficiency", "cost reduction"],
  RecurringRevenue: ["subscription", "recurring", "retention", "renewal"],
  InternationalExpansion: ["international expansion", "global expansion", "new markets"],
};

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((count, keyword) => {
    return count + (text.includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "N/A";
  return `${value.toFixed(1)}%`;
}

function formatRatio(value: number) {
  if (!Number.isFinite(value)) return "N/A";
  return value.toFixed(2);
}

export default function TenKInsightAgent() {
  const [companyName, setCompanyName] = useState("Example Company");
  const [filingText, setFilingText] = useState("");
  const [financials, setFinancials] =
    useState<FinancialInputs>(defaultFinancials);
  const [showResults, setShowResults] = useState(false);

  const normalizedText = filingText.toLowerCase();

  const riskThemes = useMemo(() => {
    return Object.entries(riskKeywords)
      .map(([theme, keywords]) => ({
        theme,
        score: countMatches(normalizedText, keywords),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [normalizedText]);

  const opportunityThemes = useMemo(() => {
    return Object.entries(opportunityKeywords)
      .map(([theme, keywords]) => ({
        theme,
        score: countMatches(normalizedText, keywords),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [normalizedText]);

  const revenueGrowth =
    ((financials.revenue - financials.priorRevenue) /
      Math.abs(financials.priorRevenue)) *
    100;

  const operatingMargin =
    (financials.operatingIncome / financials.revenue) * 100;

  const netMargin = (financials.netIncome / financials.revenue) * 100;

  const currentRatio =
    financials.currentAssets / financials.currentLiabilities;

  const debtToAssets = (financials.debt / financials.totalAssets) * 100;

  const liabilitiesToAssets =
    (financials.totalLiabilities / financials.totalAssets) * 100;

  const freeCashFlow =
    financials.operatingCashFlow - financials.capitalExpenditures;

  const freeCashFlowMargin = (freeCashFlow / financials.revenue) * 100;

  const financialHealthScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        50 +
          (revenueGrowth > 0 ? 10 : -10) +
          (operatingMargin > 10 ? 10 : operatingMargin > 0 ? 5 : -10) +
          (netMargin > 8 ? 10 : netMargin > 0 ? 5 : -10) +
          (currentRatio >= 1.5 ? 10 : currentRatio >= 1 ? 5 : -10) +
          (debtToAssets < 30 ? 10 : debtToAssets < 60 ? 0 : -10) +
          (freeCashFlow > 0 ? 10 : -10)
      )
    )
  );

  const financialHealthLevel =
    financialHealthScore >= 75
      ? "Strong"
      : financialHealthScore >= 50
      ? "Mixed"
      : "Weak";

  const redFlags = [
    revenueGrowth < 0 && "Revenue declined year-over-year.",
    operatingMargin < 0 && "Operating income is negative.",
    netMargin < 0 && "Net income is negative.",
    currentRatio < 1 && "Current liabilities exceed current assets.",
    debtToAssets > 60 && "Debt is high relative to total assets.",
    freeCashFlow < 0 && "Free cash flow is negative.",
    riskThemes.length >= 5 &&
      "Multiple risk themes appear across the filing text.",
  ].filter(Boolean);

  const analystQuestions = [
    "What are the largest drivers of revenue growth or decline?",
    "Are margins improving because of operating leverage or temporary cost actions?",
    "Which risk factors appear most material to future performance?",
    "How dependent is the company on a small set of products, customers, regions, or suppliers?",
    "Is free cash flow strong enough to support investment, debt service, and shareholder returns?",
    "Are management priorities aligned with the company’s strongest growth opportunities?",
  ];

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) return;

    const text = await file.text();
    setFilingText(text);
    setShowResults(false);
  };

  const updateFinancial = (field: keyof FinancialInputs, value: number) => {
    setFinancials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          10-K Insight Agent
        </h2>

        <p className="mt-3 max-w-3xl text-gray-400">
          Upload or paste 10-K filing text and enter key financials to generate
          an analyst-style business, risk, and financial health brief.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">
            Company Name
          </label>

          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Upload 10-K Text / HTML File
          </label>

          <input
            type="file"
            accept=".txt,.html,.htm"
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-gray-300 outline-none focus:border-gray-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            MVP supports text-based filings. SEC TXT/HTML filings work best.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-300">
          Or Paste 10-K Text
        </label>

        <textarea
          value={filingText}
          onChange={(e) => {
            setFilingText(e.target.value);
            setShowResults(false);
          }}
          placeholder="Paste sections from a 10-K here, especially Item 1, Item 1A, Item 7, and financial statement notes..."
          className="mt-2 h-56 w-full rounded-lg border border-gray-700 bg-black p-4 text-white outline-none focus:border-gray-500"
        />
      </div>

      <div className="mt-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-gray-500">
          Financial Inputs
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Revenue", "revenue"],
            ["Prior Year Revenue", "priorRevenue"],
            ["Operating Income", "operatingIncome"],
            ["Net Income", "netIncome"],
            ["Current Assets", "currentAssets"],
            ["Current Liabilities", "currentLiabilities"],
            ["Total Assets", "totalAssets"],
            ["Total Liabilities", "totalLiabilities"],
            ["Cash", "cash"],
            ["Debt", "debt"],
            ["Operating Cash Flow", "operatingCashFlow"],
            ["Capital Expenditures", "capitalExpenditures"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="text-sm font-medium text-gray-300">
                {label}
              </label>

              <input
                type="number"
                value={financials[field as keyof FinancialInputs]}
                onChange={(e) =>
                  updateFinancial(
                    field as keyof FinancialInputs,
                    Number(e.target.value)
                  )
                }
                className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}
        disabled={!filingText.trim()}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
      >
        Generate 10-K Insight Brief
      </button>

      {showResults && (
        <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Company Intelligence Brief
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              {companyName}
            </h3>

            <p className="mt-3 max-w-3xl text-gray-400">
              This brief summarizes signals detected from the filing text and
              financial inputs. It is intended for research and learning, not
              investment advice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Financial Health</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {financialHealthLevel}
              </p>
              <p className="mt-1 text-gray-500">
                Score: {financialHealthScore}/100
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Risk Themes</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {riskThemes.length}
              </p>
              <p className="mt-1 text-gray-500">
                Detected across filing text
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Opportunity Themes</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {opportunityThemes.length}
              </p>
              <p className="mt-1 text-gray-500">
                Growth and strategy signals
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Financial Analysis
              </h3>

              <div className="mt-4 space-y-3 text-gray-300">
                <p>Revenue Growth: {formatPercent(revenueGrowth)}</p>
                <p>Operating Margin: {formatPercent(operatingMargin)}</p>
                <p>Net Margin: {formatPercent(netMargin)}</p>
                <p>Current Ratio: {formatRatio(currentRatio)}</p>
                <p>Debt / Assets: {formatPercent(debtToAssets)}</p>
                <p>Liabilities / Assets: {formatPercent(liabilitiesToAssets)}</p>
                <p>Free Cash Flow Margin: {formatPercent(freeCashFlowMargin)}</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Red Flags
              </h3>

              <ul className="mt-4 space-y-3 text-gray-300">
                {redFlags.length > 0 ? (
                  redFlags.map((flag) => <li key={String(flag)}>• {flag}</li>)
                ) : (
                  <li className="text-gray-500">
                    No major financial red flags detected from the inputs.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Risk Themes
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {riskThemes.length > 0 ? (
                  riskThemes.map((item) => (
                    <span
                      key={item.theme}
                      className="rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-gray-300"
                    >
                      {item.theme}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No major risk themes detected.</p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Opportunity / Strategy Signals
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {opportunityThemes.length > 0 ? (
                  opportunityThemes.map((item) => (
                    <span
                      key={item.theme}
                      className="rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-gray-300"
                    >
                      {item.theme}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No major opportunity themes detected.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-xl font-semibold text-white">
              Analyst Questions
            </h3>

            <ul className="mt-4 space-y-3 text-gray-300">
              {analystQuestions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="font-semibold text-white">Methodology</h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              This MVP uses keyword-based filing analysis and user-provided
              financial inputs to generate a structured company intelligence
              brief. It does not yet use a paid LLM API or automatically verify
              figures from the filing. Future versions can add SEC filing fetch,
              PDF parsing, section extraction, and local LLM summarization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}