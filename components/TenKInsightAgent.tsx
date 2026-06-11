"use client";

import { useMemo, useState } from "react";

const riskKeywords = {
  Competition: ["competition", "competitive", "competitors", "pricing pressure"],
  Regulation: ["regulation", "regulatory", "compliance", "legal", "law"],
  Cybersecurity: ["cybersecurity", "cyber", "data breach", "security incident"],
  Macroeconomic: ["inflation", "interest rates", "recession", "macroeconomic"],
  SupplyChain: ["supply chain", "supplier", "shortage", "logistics"],
  CustomerConcentration: [
    "customer concentration",
    "major customer",
    "largest customer",
    "significant customer",
  ],
  DebtLiquidity: ["liquidity", "debt", "credit facility", "covenant"],
  International: [
    "foreign exchange",
    "international",
    "geopolitical",
    "currency",
  ],
  Labor: ["labor", "wages", "union", "employee", "workforce"],
  Litigation: ["litigation", "lawsuit", "legal proceedings", "claims"],
};

const opportunityKeywords = {
  Growth: ["growth", "expand", "expansion", "increase", "demand"],
  Innovation: ["innovation", "technology", "platform", "product development"],
  AI: ["artificial intelligence", " ai ", "machine learning", "automation"],
  Margin: ["margin", "operating leverage", "efficiency", "cost reduction"],
  RecurringRevenue: ["subscription", "recurring", "retention", "renewal"],
  InternationalExpansion: [
    "international expansion",
    "global expansion",
    "new markets",
  ],
  Digital: ["digital", "e-commerce", "online", "app", "omnichannel"],
};

const businessModelKeywords = {
  "Subscription / Recurring Revenue": [
    "subscription",
    "recurring revenue",
    "renewal",
    "retention",
    "annual recurring revenue",
  ],
  "Membership Model": ["membership", "members", "member renewal", "cardholders"],
  "Product Sales": [
    "product sales",
    "products",
    "merchandise",
    "hardware",
    "devices",
    "equipment",
  ],
  "Services Revenue": [
    "services",
    "professional services",
    "consulting",
    "support services",
  ],
  "Platform / Ecosystem": ["platform", "ecosystem", "marketplace", "developer"],
  "International Exposure": [
    "international",
    "global",
    "foreign",
    "outside the united states",
  ],
  "Private Label": ["private-label", "private label", "kirkland", "own brand"],
  "E-commerce": ["e-commerce", "online", "digital channels", "digital device"],
};

const managementPriorityKeywords = {
  "Growth / Expansion": [
    "growth",
    "expand",
    "expansion",
    "new markets",
    "market share",
    "warehouse openings",
  ],
  "Margin Improvement": [
    "margin",
    "efficiency",
    "cost reduction",
    "operating leverage",
  ],
  "Technology / Innovation": [
    "technology",
    "innovation",
    "product development",
    "platform",
    "digital",
  ],
  "AI / Automation": [
    "artificial intelligence",
    " ai ",
    "machine learning",
    "automation",
  ],
  "Supply Chain Optimization": [
    "supply chain",
    "supplier",
    "distribution",
    "logistics",
    "inventory",
  ],
  "Debt / Liquidity Management": [
    "debt",
    "liquidity",
    "cash flow",
    "credit facility",
  ],
  "Acquisitions / M&A": [
    "acquisition",
    "acquire",
    "merger",
    "strategic transaction",
  ],
  "Shareholder Returns": [
    "share repurchase",
    "dividend",
    "return capital",
    "shareholders",
  ],
};

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((count, keyword) => {
    return count + (text.includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);
}

function getTopSignals(
  text: string,
  keywordMap: Record<string, string[]>,
  labelKey: "theme" | "signal" | "priority"
) {
  return Object.entries(keywordMap)
    .map(([label, keywords]) => ({
      [labelKey]: label,
      score: countMatches(text, keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export default function TenKInsightAgent() {
  const [companyName, setCompanyName] = useState("Example Company");
  const [filingText, setFilingText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState("");
  const [pagesProcessed, setPagesProcessed] = useState(0);

  const normalizedText = filingText.toLowerCase();

  const riskThemes = useMemo(() => {
    return getTopSignals(normalizedText, riskKeywords, "theme") as Array<{
      theme: string;
      score: number;
    }>;
  }, [normalizedText]);

  const opportunityThemes = useMemo(() => {
    return getTopSignals(normalizedText, opportunityKeywords, "theme") as Array<{
      theme: string;
      score: number;
    }>;
  }, [normalizedText]);

  const businessModelSignals = useMemo(() => {
    return getTopSignals(
      normalizedText,
      businessModelKeywords,
      "signal"
    ) as Array<{
      signal: string;
      score: number;
    }>;
  }, [normalizedText]);

  const managementPriorities = useMemo(() => {
    return getTopSignals(
      normalizedText,
      managementPriorityKeywords,
      "priority"
    ) as Array<{
      priority: string;
      score: number;
    }>;
  }, [normalizedText]);

  const redFlags = [
    riskThemes.length >= 6 &&
      "Multiple risk categories appear across the filing text.",
    riskThemes.some((item) => item.theme === "Cybersecurity") &&
      "Cybersecurity risk language appears in the filing.",
    riskThemes.some((item) => item.theme === "DebtLiquidity") &&
      "Debt or liquidity-related risk language appears in the filing.",
    riskThemes.some((item) => item.theme === "CustomerConcentration") &&
      "Customer concentration language appears in the filing.",
    riskThemes.some((item) => item.theme === "Macroeconomic") &&
      "Macroeconomic risk language appears in the filing.",
    riskThemes.some((item) => item.theme === "SupplyChain") &&
      "Supply chain risk language appears in the filing.",
  ].filter(Boolean);

  const extractPdfText = async (file: File) => {
    setIsExtracting(true);
    setExtractionError("");
    setShowResults(false);
    setFileName(file.name);
    setPagesProcessed(0);
    setFilingText("");

    try {
      if (file.type !== "application/pdf") {
        throw new Error("Please upload a PDF file.");
      }

      const pdfjsLib = await import("pdfjs-dist");

      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let extractedText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();

        const pageText = content.items
          .map((item: any) => {
            if ("str" in item) {
              return item.str;
            }

            return "";
          })
          .join(" ");

        extractedText += `\n\n--- Page ${pageNumber} ---\n\n${pageText}`;
        setPagesProcessed(pageNumber);
      }

      if (!extractedText.trim()) {
        throw new Error(
          "No text could be extracted. This PDF may be scanned or image-based."
        );
      }

      setFilingText(extractedText);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while extracting the PDF.";

      setExtractionError(message);
      setFilingText("");
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          10-K PDF Document Intelligence Agent
        </h2>

        <p className="mt-3 max-w-3xl text-gray-400">
          Upload a company 10-K PDF to extract filing text, detect business and
          risk themes, identify strategy signals, and generate an analyst-style
          research brief.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-gray-800 bg-black p-5">
        <h3 className="text-lg font-semibold text-white">
          How to use this tool
        </h3>

        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-400">
          <li>
            Download a company’s latest 10-K or annual report PDF from SEC EDGAR
            or the company’s investor relations page.
          </li>
          <li>
            Upload the PDF below. The tool extracts readable text directly in
            your browser.
          </li>
          <li>
            Generate a structured document intelligence brief covering risks,
            business model signals, strategy themes, and research questions.
          </li>
        </ol>

        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          This version focuses on narrative and disclosure analysis. Automated
          financial statement extraction is intentionally excluded from this MVP
          because PDF tables vary widely by company and format. A future version
          can use SEC structured XBRL data for reliable financial metrics.
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
            Upload 10-K PDF
          </label>

          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                extractPdfText(file);
              }
            }}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-gray-300 outline-none focus:border-gray-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            PDF extraction happens in your browser. No file is uploaded to a
            server.
          </p>
        </div>
      </div>

      {(isExtracting || fileName || extractionError || filingText) && (
        <div className="mt-6 rounded-xl border border-gray-800 bg-black p-5">
          <h3 className="text-lg font-semibold text-white">
            PDF Extraction Status
          </h3>

          <div className="mt-4 space-y-2 text-sm text-gray-400">
            {fileName && <p>File: {fileName}</p>}

            {isExtracting && (
              <p>Extracting PDF text... pages processed: {pagesProcessed}</p>
            )}

            {!isExtracting && filingText && (
              <>
                <p>Pages processed: {pagesProcessed}</p>
                <p>
                  Characters extracted: {filingText.length.toLocaleString()}
                </p>
                <p className="text-gray-500">
                  Text extraction complete. You can now generate the insight
                  brief.
                </p>
              </>
            )}

            {extractionError && (
              <p className="text-red-400">
                Extraction error: {extractionError}
              </p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setShowResults(true)}
        disabled={!filingText.trim() || isExtracting}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
      >
        Generate 10-K Document Intelligence Brief
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
              This brief summarizes signals detected from the extracted PDF
              text. It is intended for research and learning, not investment
              advice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Document Status</p>
              <p className="mt-2 text-2xl font-bold text-white">Processed</p>
              <p className="mt-1 text-gray-500">
                {pagesProcessed} pages extracted
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

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Characters Extracted</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {filingText.length.toLocaleString()}
              </p>
              <p className="mt-1 text-gray-500">From uploaded PDF</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-xl font-semibold text-white">
              Financial Statement Analysis
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Financial ratio analysis is not generated in this MVP. PDF
              financial tables can extract inconsistently across companies,
              which can lead to incorrect values. A future version should use
              SEC structured XBRL/company facts data for reliable financial
              metrics.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="text-xl font-semibold text-white">Red Flags</h3>

            <ul className="mt-4 space-y-3 text-gray-300">
              {redFlags.length > 0 ? (
                redFlags.map((flag) => <li key={String(flag)}>• {flag}</li>)
              ) : (
                <li className="text-gray-500">
                  No major red flags detected from the extracted text.
                </li>
              )}
            </ul>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">Risk Themes</h3>

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
                  <p className="text-gray-500">
                    No major risk themes detected.
                  </p>
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

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Business Model Signals
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {businessModelSignals.length > 0 ? (
                  businessModelSignals.map((item) => (
                    <span
                      key={item.signal}
                      className="rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-gray-300"
                    >
                      {item.signal}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No clear business model signals detected.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Management Priorities
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {managementPriorities.length > 0 ? (
                  managementPriorities.map((item) => (
                    <span
                      key={item.priority}
                      className="rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-gray-300"
                    >
                      {item.priority}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No clear management priorities detected.
                  </p>
                )}
              </div>
            </div>
          </div>


          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="font-semibold text-white">Methodology</h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              This MVP extracts readable text from an uploaded 10-K PDF in the
              browser and identifies business, risk, strategy, and management
              priority themes through keyword-based analysis. It intentionally
              excludes automated financial statement extraction because PDF
              tables vary significantly by company and formatting. Future
              versions can combine PDF narrative analysis with SEC structured
              XBRL data for reliable financial metrics.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}