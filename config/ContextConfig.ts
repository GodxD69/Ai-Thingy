"use client";

export const SaveContextToLocal = (message: string, role: string) => {
	const format = {
		role: role,
		parts: [{ text: message }],
	};

	const dataString = localStorage.getItem("chatHistory");
	const dataObject = dataString ? JSON.parse(dataString) : {};

	if (!dataObject.history) {
		dataObject.history = [];
	}

	dataObject.history.push(format);
	let updatedData = JSON.stringify(dataObject);
	localStorage.setItem("chatHistory", updatedData);
};

interface SavedDate {
	history: [];
}
export const LoadContextFromLocal = () => {
	const contextString = localStorage.getItem("chatHistory");
	if (contextString) {
		try {
			return JSON.parse(contextString) || [];
		} catch (error) {
			console.error(
				"Failed to parse chat history from local storage:",
				error,
			);
			return [];
		}
	}
	return [];
};
