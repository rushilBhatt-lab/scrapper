"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Input, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import { apiclient } from "@/lib";
import { ADMIN_API_ROUTES } from "@/utils";
import { ScrapingQueue } from "@/components/admin/scraping-queue";
import { CurrentlyScrapingTable } from "./components/currently-scraping-table";

const ScrapeData = () => {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState<undefined | string>(undefined);
	const [jobs, setJobs] = useState([]);

	const searchCities = async (search: string) => {
		const response = await axios.get(`https://secure.geonames.org/searchJSON?q=${search}&maxRows=5&username=rxb33&style=SHORT`);
		const parseData = response.data?.geonames;
		const mapData = parseData?.map((city: { name: string }) => city.name) ?? [];
		setCities(mapData);
	};

	const startScraping = async () => {
		await axios.post(ADMIN_API_ROUTES.CREATE_JOB, {
			url: `https://www.thomascook.in/holidays/international-tour-packages/${selectedCity?.toLowerCase()}-tour-packages`,
			jobType: { type: "location" },
		});
	};

	useEffect(() => {
		const getData = async () => {
			const data = await axios.get(ADMIN_API_ROUTES.JOB_DETAILS);
			setJobs(data.data.jobs);
		};

		const apiInterval = setInterval(() => getData(), 3000);
		return () => {
			clearInterval(apiInterval);
		};
	}, []);

	return (
		<section className="m-10 grid grid-cols-3 gap-5">
			<Card className="col-span-2">
				<CardBody>
					<Tabs>
						<Tab key="location" title="location">
							<Input type="text" label="search for location" onChange={(e) => searchCities(e.target.value)} />
							<div className="w-full min-h-[200px] max-w-[260px] px-1 py-2 rounded-small border-default-200 mt-5 border">
								<Listbox onAction={(key) => setSelectedCity(key as string)}>
									{cities.map((city) => (
										<ListboxItem key={city} color="primary" className="text-primary-500">
											{city}
										</ListboxItem>
									))}
								</Listbox>
							</div>
						</Tab>
					</Tabs>
				</CardBody>
				<CardFooter className="flex flex-col gap-5">
					<div>{selectedCity && <h1 className="text-xl">Scrape data for {selectedCity}</h1>}</div>
				</CardFooter>
				<Button size="lg" className="w-full" color="primary" onClick={startScraping}>
					Scrape
				</Button>
			</Card>
			<ScrapingQueue />
			<div className="col-span-3">
				<CurrentlyScrapingTable jobs={jobs} />
			</div>
		</section>
	);
};

export default ScrapeData;
