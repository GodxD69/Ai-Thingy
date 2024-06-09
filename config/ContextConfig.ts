"use client";

export const SaveContextToLocal = (message: string, role: string) => {
	if (typeof window !== "undefined") {
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
	}
};

export const LoadContextFromLocal = () => {
	if (typeof window !== "undefined") {
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
	}
	return [];
};

export const ContextClear = () => {
	if (typeof window !== "undefined") {
		const localData = localStorage.getItem("chatHistory");
		try {
			const dataObject = localData ? JSON.parse(localData) : null;

			if (!dataObject) {
				return null;
			}

			dataObject.history = [];
			const updatedData = JSON.stringify(dataObject);
			localStorage.setItem("chatHistory", updatedData);
			return true;
		} catch (error) {
			return null;
		}
	}
};
