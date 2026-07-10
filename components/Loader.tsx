import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 bg-[#09090B] w-full">
			<BiLoaderCircle className="w-12 h-12 text-violet-500 animate-[spin_3s_linear_infinite]" />
			<div>
				<p className="text-white text-xl font-semibold">
					Processing your PDF
				</p>
				<p className="text-gray-400 text-sm mt-4 max-w-lg">
					Extracting text, splitting it into chunks, and generating
					embeddings for semantic search. This may take a few seconds
					depending on document size.
				</p>
			</div>
		</div>
	);
};

export default Loader;
