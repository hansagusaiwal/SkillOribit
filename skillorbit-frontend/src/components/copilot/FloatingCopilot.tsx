import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "Why is Candidate A ranked above Candidate B?",
  "Show hidden gems.",
  "Which candidates have high recruitability?",
  "What skills are missing in this talent pool?",
];

export default function FloatingCopilot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-6 z-[9999]">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full bg-[#008096] px-5 py-3 text-white shadow-2xl shadow-cyan-900/25 transition-all hover:scale-105 hover:bg-[#006577] active:scale-95"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-5 w-5 text-white" />
          </span>

          <span className="text-sm font-extrabold text-white">
            Recruiter Copilot
          </span>
        </button>
      </div>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[10000] flex h-[420px] w-[360px] flex-col overflow-hidden rounded-2xl border border-[#c7c4d7] bg-white shadow-2xl">
          {/* Header */}
          <div className="flex flex-shrink-0 items-center justify-between bg-[#008096] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-extrabold">SkillOrbit Copilot</p>
                <p className="text-[10px] text-white/75">
                  AI recruiter assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 transition hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="rounded-2xl bg-[#f6f2ff] p-3">
              <div className="mb-1.5 flex items-center gap-2 text-[#006577]">
                <Sparkles className="h-3.5 w-3.5" />
                <p className="text-[10px] font-extrabold uppercase tracking-widest">
                  AI Suggestion
                </p>
              </div>

              <p className="text-xs leading-5 text-[#464554]">
                Ask me about candidate rankings, hidden gems, recruitability
                signals, shortlist exports, or why a candidate is recommended.
              </p>
            </div>

            <div className="space-y-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  className="block w-full rounded-xl border border-[#e3dfff] bg-white px-3 py-2.5 text-left text-xs font-semibold text-[#181445] transition hover:border-[#4648d4] hover:bg-[#f6f2ff]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Input */}
          <div className="flex flex-shrink-0 items-center gap-2 border-t border-[#e3dfff] bg-white p-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#c7c4d7] bg-[#fcf8ff] px-3 py-2">
              <input
                className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#464554]/50"
                placeholder="Ask SkillOrbit Copilot..."
              />

              <button className="rounded-lg bg-[#4648d4] p-2 text-white transition hover:bg-[#3730a3]">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}