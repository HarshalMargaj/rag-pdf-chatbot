import SourceCard from "./SourceCard";

const MOCK_SOURCES = [
	{
		id: "s1",
		page: 5,
		score: 0.91,
		text: "In this work we employ 8 parallel attention layers, or heads. For each we use d_k = d_v = d_model/h = 64.",
		highlight: "8 parallel attention layers, or heads",
	},
	{
		id: "s2",
		page: 4,
		score: 0.78,
		text: "Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.",
		highlight: "different representation subspaces",
	},
	{
		id: "s3",
		page: 6,
		score: 0.64,
		text: "On a single GPU, one training step took about 0.4 seconds for the base model configuration.",
		highlight: "0.4 seconds",
	},
];

function SourcesPanel() {
	return (
		<aside className="flex w-65 shrink-0 flex-col border-l border-slate-800 bg-slate-900">
			<div className="border-b border-slate-800 p-4">
				<h3 className="text-base font-medium text-slate-200">
					Retrieved chunks
				</h3>
				<p className="text-sm text-slate-500">
					Passages used for the last answer
				</p>
			</div>
			{MOCK_SOURCES.length === 0 ? (
				<div className="flex flex-1 items-center justify-center px-5 text-center text-xs text-slate-600">
					Ask a question to see which passages were retrieved.
				</div>
			) : (
				<div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3">
					{MOCK_SOURCES.map(s => (
						<SourceCard key={s.id} source={s} />
					))}
				</div>
			)}
		</aside>
	);
}

export default SourcesPanel;
