"use client";

import { Avatar, Skeleton, Textarea, Chip, Kbd } from "@nextui-org/react";
import { IoSendSharp } from "react-icons/io5";
import { SetStateAction, useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useHotkeys } from "react-hotkeys-hook";

import { runAi } from "@/components/aiConfig";
import {
	SaveContextToLocal,
	LoadContextFromLocal,
} from "@/config/ContextConfig";

const InputSection = () => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [userMessage, setUserMessage] = useState<string>("");
	const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
	const [loading, setLoading] = useState<JSX.Element>(<></>);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [title, setTitle] = useState<JSX.Element>(
		<div className="w-full fixed top-1/3">
			<div className="flex flex-col items-center justify-center">
				<p className="text-sm">Welcome to </p>
				<span className="text-sky-400 font-bold lowercase ml-1 text-3xl">
					{" "}
					Ai-Thingy
				</span>
				<div className="mt-4 text-sm flex flex-col items-center">
					<Chip
						size="sm"
						variant="faded"
						color="default"
						className="p-4"
					>
						<div className="flex items-center">
							<Kbd keys={["enter"]}></Kbd>{" "}
							<p className="ml-2">to send response</p>
						</div>
					</Chip>
					<Chip
						size="sm"
						variant="faded"
						color="default"
						className="p-4 mt-2"
					>
						<div className="flex items-center">
							<Kbd keys={["shift", "enter"]}></Kbd>{" "}
							<p className="ml-2">to enter new line</p>
						</div>
					</Chip>
					<Chip
						size="sm"
						variant="faded"
						color="default"
						className="p-4 mt-2"
					>
						<div className="flex items-center">
							<Kbd keys={["shift", "escape"]}></Kbd>{" "}
							<p className="ml-2">to focus on textbox</p>
						</div>
					</Chip>
				</div>
			</div>
		</div>,
	);

	useHotkeys("shift+esc", (event) => {
		event.preventDefault(); // Prevent the browser's default behavior
		event.stopPropagation(); // Stop the event from propagating
		if (textAreaRef.current) {
			textAreaRef.current.focus();
		}
	});

	const context = LoadContextFromLocal() ? LoadContextFromLocal() : "";
	// android detection
	let isAndroid: boolean;
	useEffect(() => {
		isAndroid = /Android/i.test(navigator.userAgent);
	});

	async function aiExecute() {
		if (userMessage.trim() === "") {
			return;
		}

		SaveContextToLocal(userMessage, "user");
		setDisabled(true);
		setTitle(<></>);
		const userKey = `user-${Date.now()}`;
		const aiKey = `ai-${Date.now() + 1}`;
		const format = (
			<div className="w-full mt-2 lg:mt-4" key={userKey}>
				<div className="flex flex-col mr-1 items-end ">
					<Avatar name="You" size="sm" isBordered color="warning" />
					<ReactMarkdown className=" mt-2">
						{userMessage}
					</ReactMarkdown>
				</div>
			</div>
		);
		setNewMessages([...newMessages, format]);
		setLoading(
			<div className="w-full flex items-center gap-3 mt-3">
				<Avatar size="sm" />

				<div className="w-full flex flex-col gap-2">
					<Skeleton className="h-3 w-3/5 rounded-lg" />
					<Skeleton className="h-3 w-4/5 rounded-lg" />
				</div>
			</div>,
		);
		var data;
		try {
			data = await runAi(userMessage, context.history);
		} catch (error) {
			data = "Error generating response. Please try again.";
		}
		const ai_format = (
			<div className="w-full mt-4 mb-2" key={aiKey}>
				<div className="flex flex-col ml-1">
					<Avatar name="AI" size="sm" isBordered color="success" />
					<ReactMarkdown className="mt-2">{data}</ReactMarkdown>
				</div>
			</div>
		);
		SaveContextToLocal(data, "model");
		setLoading(<></>);
		setNewMessages([...newMessages, format, ai_format]);
		setUserMessage("");
		setDisabled(false);
	}

	return (
		<div
			className="flex flex-col items-center justify-center w-full"
			id="test"
		>
			{title}
			<div className="flex flex-col items-center justify-start w-full lg:w-[75%] p-1 lg:p-0 overflow-auto mb-24 pb-5 snap-y">
				{newMessages}
				{loading}
			</div>
			<section className="fixed bottom-0 w-full lg:w-[50%] pb-2 z-10">
				<div className="flex w-full gap-4 items-center justify-center">
					<Textarea
						ref={textAreaRef}
						type="text"
						size="md"
						fullWidth
						isRequired
						placeholder="Enter a prompt here"
						disabled={disabled}
						autoComplete="off"
						variant="faded"
						value={userMessage}
						endContent={
							<IoSendSharp
								size={22}
								onClick={async () => {
									if (!disabled) {
										await aiExecute();
									}
								}}
							/>
						}
						onChange={(event: {
							target: { value: SetStateAction<string> };
						}) => {
							setUserMessage(event.target.value);
						}}
						onKeyDown={async (event: {
							preventDefault(): unknown;
							code: string;
							key: string;
							shiftKey: boolean; // Updated the type to boolean for shiftKey
						}) => {
							if (
								!isAndroid &&
								!event.shiftKey &&
								(event.key === "Enter" || event.code == "Enter")
							) {
								await aiExecute();
							} else if (
								!isAndroid &&
								event.shiftKey &&
								(event.key === "Enter" ||
									event.code === "Enter")
							) {
								setUserMessage(
									(prevMessage) => `${prevMessage}\n`,
								);
							}
						}}
					/>
				</div>
			</section>
		</div>
	);
};

export default InputSection;
