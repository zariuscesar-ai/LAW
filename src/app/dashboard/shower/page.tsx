"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShowerHead,
  ChevronRight,
  ChevronLeft,
  Check,
  Ruler,
  Layers,
  MoveRight,
  MoveLeft,
  ArrowUpDown,
  Grip,
  Plus,
  X,
  Calculator,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SHOWER_STYLES,
  GLASS_THICKNESSES,
  GLASS_TYPES,
  HARDWARE_FINISHES,
  HARDWARE_ITEMS,
} from "@/lib/shower-data";
import type {
  ShowerStyleId,
  GlassThickness,
  GlassType,
  HardwareFinish,
  SwingDirection,
  SlideDirection,
  ShowerEstimate,
  CutoutPosition,
  CutoutType,
} from "@/types/shower";

// ── Step definitions ──────────────────────────────────

const STEPS = [
  { id: "style", label: "Style" },
  { id: "dimensions", label: "Size" },
  { id: "glass", label: "Glass" },
  { id: "door", label: "Door" },
  { id: "hardware", label: "Hardware" },
  { id: "cutouts", label: "Cutouts" },
  { id: "review", label: "Review" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

// ── Component ─────────────────────────────────────────

export default function ShowerEstimatorPage() {
  const [step, setStep] = useState<StepId>("style");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<ShowerEstimate | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [styleId, setStyleId] = useState<ShowerStyleId>("hinged-panel");
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(76);
  const [glassThickness, setGlassThickness] = useState<GlassThickness>("3/8");
  const [glassType, setGlassType] = useState<GlassType>("clear");
  const [hardwareFinish, setHardwareFinish] = useState<HardwareFinish>("chrome");
  const [swingDirection, setSwingDirection] = useState<SwingDirection>("left");
  const [slideDirection, setSlideDirection] = useState<SlideDirection>("left");
  const [selectedHardware, setSelectedHardware] = useState<string[]>([]);
  const [extraCutouts, setExtraCutouts] = useState<CutoutPosition[]>([]);

  const style = SHOWER_STYLES.find((s) => s.id === styleId) || SHOWER_STYLES[0];
  const glassLabel = GLASS_TYPES.find((g) => g.id === glassType)?.label || glassType;
  const finishLabel = HARDWARE_FINISHES.find((f) => f.id === hardwareFinish)?.label || hardwareFinish;
  const currentStepIdx = STEPS.findIndex((s) => s.id === step);

  // ── Navigation ──────────────────────────────────────

  const goNext = () => {
    if (currentStepIdx < STEPS.length - 1) setStep(STEPS[currentStepIdx + 1]);
  };
  const goPrev = () => {
    if (currentStepIdx > 0) setStep(STEPS[currentStepIdx - 1]);
  };

  // ── Calculate ───────────────────────────────────────

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate-shower", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          styleId,
          width,
          height,
          glassThickness,
          glassType,
          hardwareFinish,
          doorConfig: {
            enabled: style.hasDoor,
            swingDirection: style.id === "bypass" ? undefined : swingDirection,
            slideDirection: style.id === "bypass" ? slideDirection : undefined,
            width,
            height,
          },
          hardwareIds: selectedHardware,
          extraCutouts,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Estimation failed");
      setEstimate(json.data);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ── Cutout helpers ──────────────────────────────────

  const addCutout = (type: CutoutType) => {
    const id = `${type}-${Date.now()}`;
    setExtraCutouts((prev) => [
      ...prev,
      { id, type, label: typeLabels[type], fromTop: 36, fromEdge: 2, side: "left", size: cutoutSizes[type] },
    ]);
  };

  const removeCutout = (id: string) => {
    setExtraCutouts((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleHardware = (id: string) => {
    setSelectedHardware((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  // ── Render ──────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green differentiator header */}
      <header className="bg-emerald-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-emerald-200 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <ShowerHead className="w-5 h-5" />
            <span className="font-semibold">Shower Glass Estimator</span>
          </div>
          <span className="text-xs text-emerald-200 bg-emerald-800 rounded-full px-3 py-1">
            Shower Mode
          </span>
        </div>

        {/* Step indicator */}
        <div className="bg-emerald-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex">
            {STEPS.map((s, i) => {
              const isActive = s.id === step;
              const isDone = i < currentStepIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={cn(
                    "flex-1 py-2.5 text-center text-xs font-medium border-b-2 transition-colors",
                    isActive && "border-white text-white",
                    isDone && "border-emerald-300 text-emerald-200",
                    !isActive && !isDone && "border-transparent text-emerald-300/70"
                  )}
                >
                  <span className="hidden sm:inline">{i + 1}. </span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
            <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
          </div>
        )}

        {/* ── Step 1: Style ──────────────────────────── */}
        {step === "style" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose shower style</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Select the type of shower enclosure you&apos;re estimating.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(SHOWER_STYLES).map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setStyleId(s.id);
                    if (s.standardWidths.length > 0) setWidth(s.standardWidths[0]);
                    setHeight(s.standardHeight);
                  }}
                  className={cn(
                    "text-left rounded-xl border-2 p-5 transition-all duration-200",
                    styleId === s.id
                      ? "border-emerald-600 bg-emerald-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                    styleId === s.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    <ShowerHead className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.label}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.standardWidths.map((w) => (
                      <span key={w} className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5">
                        {w}&quot;
                      </span>
                    ))}
                  </div>
                  {styleId === s.id && (
                    <div className="mt-3 flex justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        Selected <Check className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Dimensions ──────────────────────── */}
        {step === "dimensions" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Enter dimensions</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Wall-to-wall opening width and height for your {style.label.toLowerCase()}.
            </p>

            <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
              {/* Width */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Width
                </label>
                <div className="flex gap-3">
                  {style.standardWidths.map((w) => (
                    <button
                      key={w}
                      onClick={() => setWidth(w)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                        width === w
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      )}
                    >
                      {w}&quot;
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-gray-400" />
                  <input
                    type="range"
                    min={style.widthRange.min}
                    max={style.widthRange.max}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-sm font-mono font-semibold text-gray-900 w-12 text-right">
                    {width}&quot;
                  </span>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <div className="flex gap-3 mb-3">
                  {[72, 76, 80, 84].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHeight(h)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                        height === h
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      )}
                    >
                      {h}&quot;
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-gray-400 rotate-90" />
                  <input
                    type="range"
                    min={24}
                    max={120}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-sm font-mono font-semibold text-gray-900 w-12 text-right">
                    {height}&quot;
                  </span>
                </div>
              </div>

              {/* Visual */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Layers className="h-4 w-4 text-emerald-600" />
                  <span>
                    {width}&quot; W × {height}&quot; H · {style.panelCount} panel{style.panelCount > 1 ? "s" : ""}
                    {" · "}
                    {((width * height) / 144).toFixed(1)} sq ft per panel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Glass ───────────────────────────── */}
        {step === "glass" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Select glass</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Choose thickness and glass type for your shower enclosure.
            </p>

            {/* Thickness */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Thickness</h3>
              <div className="flex gap-3">
                {(GLASS_THICKNESSES).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGlassThickness(t.id)}
                    className={cn(
                      "flex-1 rounded-xl border-2 p-4 text-center transition-all",
                      glassThickness === t.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <div className="text-2xl font-bold text-gray-900">{t.id}&quot;</div>
                    <div className="text-xs text-muted-foreground">{t.mmEquivalent}</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      ${t.basePricePerSqFt.toFixed(2)}/sq ft base
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Glass type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Glass Type</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(GLASS_TYPES).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlassType(g.id)}
                    className={cn(
                      "text-left rounded-xl border-2 p-4 transition-all",
                      glassType === g.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <div className="font-semibold text-gray-900 text-sm mb-0.5">{g.label}</div>
                    <div className="text-xs text-muted-foreground">{g.description}</div>
                    {g.priceMultiplier > 1 && (
                      <div className="text-xs text-amber-600 font-medium mt-1">
                        +{((g.priceMultiplier - 1) * 100).toFixed(0)}% premium
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Door ────────────────────────────── */}
        {step === "door" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Door configuration</h2>
            <p className="text-sm text-muted-foreground mb-6">
              {style.id === "bypass"
                ? "Choose which direction the door slides open."
                : style.id === "fixed-panel"
                ? "This style has no door — skip to the next step."
                : "Choose which way the door swings open."}
            </p>

            {style.id !== "fixed-panel" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
                {style.id === "bypass" ? (
                  /* Bypass — slide direction */
                  <div className="flex gap-4">
                    {(["left", "right"] as SlideDirection[]).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setSlideDirection(dir)}
                        className={cn(
                          "flex-1 rounded-xl border-2 p-6 text-center transition-all",
                          slideDirection === dir
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        {dir === "left" ? (
                          <MoveLeft className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        ) : (
                          <MoveRight className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        )}
                        <div className="font-semibold text-sm">
                          Slides {dir === "left" ? "Left" : "Right"}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Hinged — swing direction */
                  <div className="flex gap-4">
                    {(["left", "right"] as SwingDirection[]).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setSwingDirection(dir)}
                        className={cn(
                          "flex-1 rounded-xl border-2 p-6 text-center transition-all",
                          swingDirection === dir
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <ArrowUpDown className="h-8 w-8 mx-auto mb-2 text-gray-700" />
                        <div className="font-semibold text-sm">
                          Swings {dir === "left" ? "Left" : "Right"}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Step 5: Hardware ────────────────────────── */}
        {step === "hardware" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Select hardware & finish</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Choose the finish and hardware components for your enclosure.
            </p>

            {/* Finish */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Finish</h3>
              <div className="flex flex-wrap gap-3">
                {(HARDWARE_FINISHES).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setHardwareFinish(f.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 transition-all",
                      hardwareFinish === f.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <span
                      className="inline-block h-5 w-5 rounded-full border"
                      style={{ backgroundColor: f.hex }}
                    />
                    <span className="text-sm font-medium text-gray-900">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware components */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Components</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {HARDWARE_ITEMS.map((hw) => {
                  const isSelected = selectedHardware.includes(hw.id);
                  return (
                    <button
                      key={hw.id}
                      onClick={() => toggleHardware(hw.id)}
                      className={cn(
                        "text-left rounded-xl border-2 p-4 transition-all flex items-start gap-3",
                        isSelected
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0",
                        isSelected ? "border-emerald-600 bg-emerald-600" : "border-gray-300"
                      )}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{hw.label}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {hw.defaultQty} · ~${(hw.basePriceCents / 100).toFixed(0)}/ea
                          {" · "}{hw.cutoutTemplate.length} cutout{hw.cutoutTemplate.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedHardware.length === 0 && (
                <p className="text-xs text-muted-foreground mt-3">
                  No hardware selected — a basic package will be auto-included in the estimate.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── Step 6: Cutouts ─────────────────────────── */}
        {step === "cutouts" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Cutout placement</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Add custom cutouts for valves, outlets, or notches. Standard hinge & clamp cutouts are included automatically with your hardware selection.
            </p>

            {/* Glass panel visual */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Glass Panel Layout</h3>
              <div className="relative mx-auto bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden"
                style={{
                  width: "200px",
                  height: `${Math.round(200 * height / width)}px`,
                  maxHeight: "350px",
                }}
              >
                {/* Panel label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-gray-400">
                    {width}&quot; × {height}&quot;
                  </span>
                </div>

                {/* Cutout markers */}
                {(selectedHardware.length > 0
                  ? selectedHardware.flatMap((hid) => {
                      const hw = HARDWARE_ITEMS.find((h) => h.id === hid);
                      return hw ? hw.cutoutTemplate.map((ct, i) => ({
                        ...ct,
                        id: `${hw.id}-${ct.type}-${i}`,
                      })) : [];
                    })
                  : []
                ).map((ct) => (
                  <div
                    key={ct.id}
                    className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-700"
                    style={{
                      top: `${(ct.fromTop / height) * 100}%`,
                      left: ct.side === "left" ? `${(ct.fromEdge / width) * 100}%` : "auto",
                      right: ct.side === "right" ? `${(ct.fromEdge / width) * 100}%` : "auto",
                      transform: "translate(-50%, -50%)",
                    }}
                    title={`${ct.label} — ${ct.fromTop}" from top, ${ct.fromEdge}" from ${ct.side}`}
                  />
                ))}

                {/* Extra cutout markers */}
                {extraCutouts.map((ct) => (
                  <div
                    key={ct.id}
                    className="absolute w-3 h-3 rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center cursor-pointer"
                    style={{
                      top: `${(ct.fromTop / height) * 100}%`,
                      left: ct.side === "left" ? `${(ct.fromEdge / width) * 100}%` : "auto",
                      right: ct.side === "right" ? `${(ct.fromEdge / width) * 100}%` : "auto",
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => removeCutout(ct.id)}
                    title={`${ct.label} — click to remove`}
                  >
                    <X className="h-2 w-2 text-white" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Hardware cutouts
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Custom cutouts
                </span>
              </div>
            </div>

            {/* Add cutout */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Add custom cutout</h3>
              <div className="flex flex-wrap gap-2">
                {(["valve", "outlet", "notch"] as CutoutType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => addCutout(type)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5 text-emerald-600" />
                    {typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra cutouts list */}
            {extraCutouts.length > 0 && (
              <div className="mt-4 space-y-2">
                {extraCutouts.map((ct) => (
                  <div key={ct.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
                    <div className="flex items-center gap-3 text-sm">
                      <Grip className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{ct.label}</span>
                      <span className="text-muted-foreground">
                        {ct.fromTop}&quot; from top · {ct.fromEdge}&quot; from {ct.side}
                      </span>
                    </div>
                    <button onClick={() => removeCutout(ct.id)} className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Step 7: Review ──────────────────────────── */}
        {step === "review" && estimate && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Estimate Summary</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Here&apos;s your shower glass estimate. Review and adjust as needed.
            </p>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              {/* Header */}
              <div className="bg-emerald-600 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{style.label}</div>
                  <div className="text-sm text-emerald-100">
                    {width}&quot; × {height}&quot; · {glassThickness}&quot; {glassLabel}
                    {" · "}{finishLabel}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{estimate.totalFormatted}</div>
                  <div className="text-xs text-emerald-100">estimated total</div>
                </div>
              </div>

              {/* Line items */}
              <div className="divide-y divide-gray-100">
                {estimate.lines.map((line, i) => (
                  <div key={i} className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{line.label}</div>
                      <div className="text-xs text-muted-foreground">{line.detail}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(line.amountCents / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-emerald-700">{estimate.totalFormatted}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("style")}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" /> Adjust estimate
              </button>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}
                Recalculate
              </button>
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ──────────────────────── */}
        {step !== "review" && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentStepIdx === 0}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            <span className="text-xs text-muted-foreground">
              Step {currentStepIdx + 1} of {STEPS.length - 1}
            </span>

            {currentStepIdx < STEPS.length - 2 ? (
              <button
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Calculating...</>
                ) : (
                  <><Calculator className="h-4 w-4" /> Calculate Estimate</>
                )}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Label constants ───────────────────────────────────

const typeLabels: Record<CutoutType, string> = {
  hinge: "Hinge cutout",
  clamp: "Clamp hole",
  handle: "Handle hole",
  valve: "Valve cutout",
  outlet: "Outlet cutout",
  notch: "Notch",
};

const cutoutSizes: Record<CutoutType, number> = {
  hinge: 1.5,
  clamp: 1.0,
  handle: 0.75,
  valve: 4.0,
  outlet: 2.0,
  notch: 2.0,
};
