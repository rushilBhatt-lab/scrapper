"use client";

import React, { useState } from "react";
import { Sidebar as ReactProSidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { BiSolidCategory } from "react-icons/bi";
import { FaBookOpen, FaHome, FaHotel } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDataUsage } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SideBar = () => {
	const router = useRouter();
	const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
	const menuItems = [
		{ label: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
		{
			label: "Trips",
			icon: <BiSolidCategory />,
			link: "/admin/trips",
		},
		{
			label: "Hotels",
			icon: <FaHotel />,
			link: "/admin/hotels",
		},
		{ label: "Bookings", icon: <FaBookOpen />, link: "/admin/bookings" },
		{
			label: "Scrape Data",
			icon: <MdOutlineDataUsage />,
			link: "/admin/scrape-data",
		},
	];

	const handleClick = (link: string) => {
		setSelectedItem(link);
		router.push(link);
	};
	return (
		<div className="min-h-[100vh] overflow-hidden">
			<ReactProSidebar
				className="h-full overflow-hidden"
				rootStyles={{
					[`.${sidebarClasses.container}`]: {
						backgroundColor: "#FFFFFF",
						"&:hover": {
							backgroundColor: "#ffffff",
						},
					},
				}}
			>
				<Menu className="h-[100vh] max-h-[100vh] text-black overflow-hidden">
					<div className="flex items-center justify-center my-10 flex-col">
						<Image
							src="/logo.png"
							alt="logo"
							height={150}
							width={150}
							className="cursor-pointer"
							onClick={() => router.push("/admin/dashboard")}
						/>
						<span className="text-3xl uppercase font-medium">
							<span>Travel App</span>
						</span>
					</div>
					{menuItems.map((item, index) => (
						<React.Fragment key={index}>
							<MenuItem icon={item.icon} active={selectedItem === item.link} onClick={() => handleClick(item.link)}>
								{item.label}
							</MenuItem>
						</React.Fragment>
					))}
					<MenuItem icon={<LuLogOut />} active={selectedItem === "/admin/logout"} onClick={() => handleClick("/admin/logout")}>
						Logout
					</MenuItem>
				</Menu>
			</ReactProSidebar>
		</div>
	);
};

export default SideBar;
