"use client";

import { useState } from "react";

export default function SupplierRiskCalculator() {
  const [formData, setFormData] = useState({
    financialHealth: 3,
    geographicDiversification: 3,
    qualityPerformance: 3,
    onTimeDelivery: 95,
    spendConcentration: 15,
    contractLength: 2,
  });

  const [showResults, setShowResults] = useState(false);

  const financialRisk = (5 - formData.financialHealth) * 20;
  const geographicRisk = (5 - formData.geographicDiversification) * 20;
  const qualityRisk = (5 - formData.qualityPerformance) * 20;
  const deliveryRisk = 100 - formData.onTimeDelivery;
  const spendRisk = Math.min(formData.spendConcentration * 2, 100);
  const contractRisk =
    formData.contractLength < 2 ? 80 : formData.contractLength > 3 ? 20 : 50;

  const riskScore = Math.round(
    financialRisk * 0.25 +
      qualityRisk * 0.2 +
      deliveryRisk * 0.15 +
      geographicRisk * 0.15 +
      spendRisk * 0.15 +
      contractRisk * 0.1
  );

  const riskLevel: "High" | "Medium" | "Low" =
    riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";

  const recommendations = {
    High: [
      "Launch dual-sourcing strategy for critical materials or services.",
      "Escalate supplier risk exposure to procurement leadership.",
      "Increase supplier performance reviews to monthly cadence.",
      "Evaluate safety stock, alternate suppliers, and contract risk protections.",
    ],
    Medium: [
      "Identify qualified backup suppliers within 90 days.",
      "Conduct quarterly supplier business reviews.",
      "Monitor financial, quality, and delivery indicators monthly.",
      "Review contract terms for service levels, penalties, and continuity clauses.",
    ],
    Low: [
      "Maintain current supplier management approach.",
      "Continue annual supplier reviews and standard performance monitoring.",
      "Document backup suppliers as part of category contingency planning.",
      "Consider strategic partnership opportunities if supplier performance remains strong.",
    ],
  };

  const updateField = (field: keyof typeof formData, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Supplier Risk Assessment Calculator
        </h2>

        <p className="mt-3 max-w-3xl text-gray-400">
          Evaluate supplier risk using weighted procurement factors including
          financial health, quality, delivery performance, geographic exposure,
          spend concentration, and contract stability.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">
            Financial Health: {formData.financialHealth}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.financialHealth}
            onChange={(e) =>
              updateField("financialHealth", Number(e.target.value))
            }
            className="mt-3 w-full"
            style={{
              accentColor: "#FFFFFF",
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Geographic Diversification: {formData.geographicDiversification}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.geographicDiversification}
            onChange={(e) =>
              updateField("geographicDiversification", Number(e.target.value))
            }
            className="mt-3 w-full"
            style={{
              accentColor: "#FFFFFF",
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Single Site</span>
            <span>Multi-Region</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Quality Performance: {formData.qualityPerformance}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.qualityPerformance}
            onChange={(e) =>
              updateField("qualityPerformance", Number(e.target.value))
            }
            className="mt-3 w-full"
            style={{
              accentColor: "#FFFFFF",
            }}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            On-Time Delivery Rate (%)
          </label>
          <input
            type="number"
            min="50"
            max="100"
            value={formData.onTimeDelivery}
            onChange={(e) =>
              updateField("onTimeDelivery", Number(e.target.value))
            }
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Spend Concentration (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.spendConcentration}
            onChange={(e) =>
              updateField("spendConcentration", Number(e.target.value))
            }
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Approximate share of total category or procurement spend tied to
            this supplier.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Contract Length (years)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={formData.contractLength}
            onChange={(e) =>
              updateField("contractLength", Number(e.target.value))
            }
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Shorter or unstable contracts may increase pricing and continuity
            risk.
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
      >
        Calculate Supplier Risk
      </button>

      {showResults && (
        <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Supplier Risk Score</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {riskScore}/100
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Risk Level</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {riskLevel}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Primary Exposure</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {riskScore >= 70
                  ? "High Disruption"
                  : riskScore >= 40
                  ? "Moderate Watchlist"
                  : "Stable Supplier"}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white">
              Recommended Actions
            </h3>

            <ul className="mt-4 space-y-3 text-gray-300">
              {recommendations[riskLevel].map((rec) => (
                <li
                  key={rec}
                  className="rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <h3 className="font-semibold text-white">Methodology</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              The supplier risk score is a weighted scenario model based on
              common procurement risk dimensions: financial health, quality
              performance, delivery reliability, geographic diversification,
              spend concentration, and contract stability. The model is intended
              as a decision-support prototype and can be tuned by category,
              industry, and supplier criticality.
            </p>

            <div className="mt-4 grid gap-3 text-sm text-gray-400 md:grid-cols-2">
              <p>Financial Health: 25%</p>
              <p>Quality Performance: 20%</p>
              <p>On-Time Delivery: 15%</p>
              <p>Geographic Diversification: 15%</p>
              <p>Spend Concentration: 15%</p>
              <p>Contract Stability: 10%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}