"use client";

import { Avatar, Skeleton, Textarea } from "@nextui-org/react";
import { IoSendSharp } from "react-icons/io5";
import { useState } from "react";

import { runAi } from "@/components/aiConfig";
import ReactMarkdown from "react-markdown";

const InputSection = () => {
	const [userMessage, setUserMessage] = useState<string>("");
	const [newMessages, setNewMessages] = useState<JSX.Element[]>([]);
	const [loading, setLoading] = useState(<></>);
	const [title, setTitle] = useState(
		<p className="w-full h-screen flex items-center justify-center mt-[-4rem] text-xl">
			Welcome to{" "}
			<span className="text-sky-400 font-bold ml-1"> Ai-Thingy</span>
		</p>,
	);
	const [disabled, setDisabled] = useState(false);

	// android detection fuck apple
	const isAndroid = /Android/i.test(navigator.userAgent);

	async function aiExecute() {
		if (userMessage.trim() === "") {
			return;
		}
		setDisabled(true);
		setTitle(<></>);
		const userKey = `user-${Date.now()}`;
		const aiKey = `ai-${Date.now() + 1}`;
		const format = (
			<div className="w-full mt-2 lg:mt-4" key={userKey}>
				<div className="flex flex-col mr-1 items-end ">
					<Avatar name="You" size="sm" isBordered color="warning" />
					<p className=" mt-2">{userMessage}</p>
				</div>
			</div>
		);
		setNewMessages([...newMessages, format]);
		setLoading(
			<div className="w-full flex items-center gap-3 mt-2">
				<Avatar size="sm" />

				<div className="w-full flex flex-col gap-2">
					<Skeleton className="h-3 w-3/5 rounded-lg" />
					<Skeleton className="h-3 w-4/5 rounded-lg" />
				</div>
			</div>,
		);
		const data = await runAi(userMessage);
		const ai_format = (
			<div className="w-full mt-2 mb-2" key={aiKey}>
				<div className="flex flex-col ml-1">
					<Avatar name="AI" size="sm" isBordered color="success" />
					<ReactMarkdown className="mt-2">{data}</ReactMarkdown>
				</div>
			</div>
		);
		setLoading(<></>);
		setNewMessages([...newMessages, format, ai_format]);
		setDisabled(false);
	}

	return (
		<div className="flex flex-col items-center justify-center w-full">
			{title}
			<div className="flex flex-col items-center justify-start w-full lg:w-[75%] overflow-auto mb-20">
				{newMessages}
				{loading}
			</div>
			<section className="fixed bottom-0 w-full lg:w-[50%] pb-2 z-10">
				<div className="flex w-full gap-4 items-center justify-center">
					<Textarea
						minRows={2}
						maxRows={8}
						type="text"
						size="lg"
						isRequired
						placeholder="Enter a prompt here"
						disabled={disabled}
						autoComplete="off"
						variant="faded"
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
						onChange={(event) => {
							if (event.target.value.trim() !== "") {
								setUserMessage(event.target.value);
							}
						}}
						onKeyDown={async (event) => {
							if (
								(isAndroid &&
									(event.code === "Enter" ||
										event.key === "Enter")) ||
								(!isAndroid &&
									event.shiftKey &&
									(event.code === "Enter" ||
										event.key === "Enter"))
							) {
								await aiExecute();
							}
						}}
					/>
				</div>
			</section>
		</div>
	);
};

export default InputSection;
