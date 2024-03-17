import { apiclient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ScrapingQueue = () => {
	const [runningJobs, setRunningJobs] = useState(0);

	useEffect(() => {
		const getData = async () => {
			const data = await axios.get(ADMIN_API_ROUTES.JOB_DETAILS);
			setRunningJobs(data.data.runningJobs);
		};

		const apiInterval = setInterval(() => getData(), 3000);
		return () => {
			clearInterval(apiInterval);
		};
	}, []);

	const renderRunningJobColors = () => {
		if (runningJobs <= 5) {
			return "bg-green-500";
		} else if (runningJobs <= 10) {
			return "bg-orange-500";
		} else {
			return "bg-red-500";
		}
	};

	const renderRunningJobTextColors = () => {
		if (runningJobs <= 5) {
			return "text-green-500";
		} else if (runningJobs <= 10) {
			return "text-orange-500";
		} else {
			return "text-red-500";
		}
	};
	return (
		<Card className="h-full">
			<CardHeader className="">Current Queue</CardHeader>
			<CardBody className="flex items-center justify-center">
				<div className={`h-52 w-52 rounded-full flex items-center justify-center ${renderRunningJobColors()}`}>
					<div className="h-44 w-44 rounded-full flex items-center justify-center bg-white">
						<h4 className={`text-6xl font-bold ${renderRunningJobTextColors()}`}>{runningJobs}</h4>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default ScrapingQueue;
