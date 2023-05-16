import React from "react";
import { AiOutlineFileAdd } from "react-icons/ai";

const CreateRequestLoR = () => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow m-5 p-8">
			<div className="flex items-center justify-center w-full">
				<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<AiOutlineFileAdd fontSize={40} color="gray" />
					</div>
				</label>
			</div>
		</div>
	);
};

export default CreateRequestLoR;
