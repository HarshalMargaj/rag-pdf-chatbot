function SourceCard({ source }) {
	const parts = source.highlight
		? source.text.split(source.highlight)
		: [source.text];
	return (
		<div className="rounded-xl border border-slate-800 p-3">
			<div className="mb-2 flex items-center justify-between">
				<span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400">
					Page {source.page}
				</span>
				<span className="text-[11px] text-slate-600">
					{source.score.toFixed(2)} match
				</span>
			</div>
			<p className="m-0 text-[12.5px] leading-relaxed text-slate-400">
				{source.highlight ? (
					<>
						{parts[0]}
						<mark className="rounded bg-violet-500/20 px-0.5 text-slate-200">
							{source.highlight}
						</mark>
						{parts[1]}
					</>
				) : (
					source.text
				)}
			</p>
		</div>
	);
}

export default SourceCard;
