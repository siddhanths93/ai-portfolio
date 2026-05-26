"use client";

import { useState } from "react";

export default function TariffExposureEstimator() {
  const [annualSpend, setAnnualSpend] = useState(1000000);
  const [tariffRate, setTariffRate] = useState(10);
  const [supplierDependence, setSupplierDependence] = useState(60);
  const [grossMargin, setGrossMargin] = useState(30);
  const [costPassThrough, setCostPassThrough] = useState(25);
  const [showResults, setShowResults] = useState(false);

  const tariffCost = annualSpend * (tariffRate / 100);
  const recoveredCost = tariffCost * (costPassThrough / 100);
  const unrecoveredCost = tariffCost - recoveredCost;

  const grossMarginDollars = annualSpend * (grossMargin / 100);
  const marginExposure =
    grossMarginDollars > 0 ? unrecoveredCost / grossMarginDollars : 0;

  const riskScore = Math.min(
    Math.round(
      tariffRate * 2.5 +
        supplierDependence * 0.35 +
        marginExposure * 35 -
        costPassThrough * 0.15
    ),
    100
  );

  const riskLevel: "High" | "Medium" | "Low" =
    riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";

  const recommendations = {
    High: [
      "Launch dual-sourcing or alternate-country sourcing analysis immediately.",
      "Review tariff pass-through language in supplier and customer contracts.",
      "Model landed-cost alternatives including nearshore or domestic suppliers.",
      "Escalate exposure to category leadership and finance for margin planning.",
    ],
    Medium: [
      "Run scenario analysis across multiple tariff-rate assumptions.",
      "Identify qualified backup suppliers in lower-exposure regions.",
      "Evaluate supplier negotiations, price indexing, and shared-cost mechanisms.",
      "Monitor tariff policy changes and update landed-cost models monthly.",
    ],
    Low: [
      "Maintain current sourcing strategy while monitoring tariff exposure.",
      "Document backup suppliers as a contingency measure.",
      "Refresh landed-cost assumptions during quarterly category reviews.",
      "Continue tracking tariff rates, logistics cost, and supplier-country exposure.",
    ],
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Tariff Exposure & Landed Cost Estimator
        </h2>

        <p className="mt-3 max-w-3xl text-gray-400">
          Estimate how tariff changes may affect supplier cost, margin exposure,
          and sourcing risk. This is a scenario-planning model using
          user-entered tariff assumptions.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-300">
            Annual Supplier Spend ($)
          </label>
          <input
            type="number"
            value={annualSpend}
            onChange={(e) => setAnnualSpend(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Tariff Rate Assumption (%)
          </label>
          <input
            type="number"
            value={tariffRate}
            onChange={(e) => setTariffRate(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Supplier Dependence (%)
          </label>
          <input
            type="number"
            value={supplierDependence}
            onChange={(e) => setSupplierDependence(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Approximate share of category or component spend tied to this
            supplier/source.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Gross Margin (%)
          </label>
          <input
            type="number"
            value={grossMargin}
            onChange={(e) => setGrossMargin(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300">
            Cost Pass-Through Ability (%)
          </label>
          <input
            type="number"
            value={costPassThrough}
            onChange={(e) => setCostPassThrough(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-gray-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Estimate how much of the tariff cost can be passed to customers or
            recovered through pricing.
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowResults(true)}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
      >
        Calculate Tariff Exposure
      </button>

      {showResults && (
        <div className="mt-8 rounded-2xl border border-gray-800 bg-black p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Estimated Tariff Cost</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatCurrency(tariffCost)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Unrecovered Cost</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatCurrency(unrecoveredCost)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
              <p className="text-sm text-gray-400">Risk Level</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {riskLevel} ({riskScore}/100)
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
              The risk score combines tariff rate, supplier dependence, margin
              exposure, and cost pass-through ability. It is intended as a
              scenario-planning model, not a real-time customs-duty engine.
              Users should input tariff assumptions from HTS lookup, trade
              compliance guidance, customs brokers, or internal landed-cost
              models.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}