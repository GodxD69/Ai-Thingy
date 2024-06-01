"use server";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@nextui-org/react";

import Link from "next/link";

const NavBar = async () => {
	return (
		<Navbar>
			<NavbarBrand>
				<p className="font-bold text-xl lg:text-2xl">Ai-Thingy</p>
			</NavbarBrand>
			<NavbarContent justify="end">
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
