"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@nextui-org/react";
import Link from "next/link";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useState } from "react";

import { ContextClear } from "@/config/ContextConfig";

const NavBar = () => {
	const [endContent, setEndContent] = useState(
		<RiDeleteBin2Line size={16} />,
	);
	const [isDisabled, setDisabled] = useState<boolean>(false);
	const [loading, isLoading] = useState<boolean>(false);

	function RemoveContext() {
		isLoading(true);
		const removeTest = ContextClear();
		if (removeTest) {
			setEndContent(<TiTick size={16} color="green" />);
			setDisabled(true);
		} else {
			setEndContent(<ImCross size={16} color="red" />);
		}
		isLoading(false);
	}

	return (
		<Navbar
			className="z-20 bg-zinc-800"
			position="sticky"
			isBlurred
			isBordered
		>
			<NavbarBrand>
				<p className="font-bold text-xl lg:text-2xl">AiThingy</p>
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						color="danger"
						variant="bordered"
						size="sm"
						isDisabled={isDisabled}
						endContent={endContent}
						isLoading={loading}
						onClick={() => RemoveContext()}
					>
						<p className="text-white">Clear Context</p>
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color="success"
						href="https://github.com/real-zephex"
						variant="bordered"
						target="_blank"
						size="sm"
					>
						Github
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default NavBar;
