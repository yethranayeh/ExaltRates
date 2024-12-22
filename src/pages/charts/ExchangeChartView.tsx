import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/shadcn/Chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/Select";
import { useCurrencyMapData } from "@/hooks/useCurrencyMap";
import { convert } from "@/utils/convert";
import { Currency } from "@/components/Currency";
import { isAfter, sub } from "date-fns";
import { currencies } from "@/constant";
import { Label } from "@/components/shadcn/Label";

function getCssVarSafeString(unsafe: string) {
	return unsafe.replaceAll(" ", "").replaceAll("'", "");
}

// TODO: refactor
export function ExchangeChartView() {
	const [selected, setSelected] = useState<CurrencyKey>("Exalted Orb");
	const currencyMap = useCurrencyMapData()!;

	const [timeRange, setTimeRange] = useState(7);
	const filteredData = currencyMap
		.filter((d) => !!d[selected] && isAfter(new Date(d.meta.createdAt), sub(new Date(), { days: timeRange })))
		.map((data) => {
			const selection = data[selected];

			const res: Partial<Record<string, number | null>> = {};

			for (const key of Object.keys(selection)) {
				const cssVarSafeName = getCssVarSafeString(key);

				const rate = convert(selected, key as CurrencyKey, data).rate;

				if (!rate) {
					continue;
				}

				res[cssVarSafeName] = rate;
			}

			return { ...res, date: data.meta.createdAt };
		});

	const chartConfig = useMemo(() => {
		const config: Record<string, { label: CurrencyKey; color: string }> = {};

		let colorIndex = 1;
		const availableComparators = currencies.filter((c) => c !== selected);

		for (const currency of availableComparators) {
			const cssVarSafeName = getCssVarSafeString(currency);

			config[cssVarSafeName] = { label: currency, color: `hsl(var(--chart-${colorIndex}))` };

			if (colorIndex === 5) {
				colorIndex = 1;
			} else {
				colorIndex += 1;
			}
		}
		return config;
	}, [selected]) satisfies ChartConfig;

	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col items-start justify-between sm:flex-row sm:items-end border-b border-primary-darker border-dashed pb-4 gap-4'>
				<div className='flex flex-col gap-1 w-full sm:w-[250px]'>
					<Label htmlFor='currency'>Base currency</Label>
					<Select value={selected} onValueChange={(v: CurrencyKey) => setSelected(v)}>
						<SelectTrigger id='currency' className='rounded-lg sm:ml-auto' aria-label='Select a currency'>
							<SelectValue placeholder='Currency' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							{currencies.map((c) => (
								<SelectItem key={c} value={c} className='rounded-lg'>
									<Currency name={c} />
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='flex flex-col gap-1 w-full sm:w-[200px]'>
					<Label htmlFor='time-range'>Time range</Label>
					<Select value={timeRange.toString()} onValueChange={(v) => setTimeRange(parseInt(v))}>
						<SelectTrigger id='time-range' className='rounded-lg sm:ml-auto' aria-label='Select a value'>
							<SelectValue placeholder='Last 7 days' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							<SelectItem value='7' className='rounded-lg'>
								Last 7 days
							</SelectItem>
							<SelectItem value='14' className='rounded-lg'>
								Last 2 weeks
							</SelectItem>
							<SelectItem value='30' className='rounded-lg'>
								Last 30 days
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-y-8 ml-[-40px] md:grid-cols-2 xl:grid-cols-3'>
				{currencies
					.filter(
						(c) =>
							filteredData.some((data) => Object.keys(data).includes(getCssVarSafeString(c))) &&
							c !== selected &&
							c !== "Mirror of Kalandra"
					)
					.map((currency) => {
						const cssSafeName = getCssVarSafeString(currency);

						return (
							<div key={currency} className='flex flex-col items-center gap-4'>
								<div className='pl-6'>
									<Currency name={chartConfig[cssSafeName].label} />
								</div>
								<ChartContainer config={chartConfig} className='aspect-auto h-[140px] w-full border-dashed'>
									<AreaChart data={filteredData}>
										<defs>
											<linearGradient key={cssSafeName} id={`fill${cssSafeName}`} x1='0' y1='0' x2='0' y2='1'>
												<stop offset='5%' stopColor={`var(--color-${cssSafeName}, crimson)`} stopOpacity={0.8} />
												<stop offset='95%' stopColor={`var(--color-${cssSafeName}, crimson)`} stopOpacity={0.1} />
											</linearGradient>
										</defs>

										<CartesianGrid vertical={false} />

										<XAxis
											dataKey='date'
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											minTickGap={32}
											tickFormatter={(value) => {
												const date = new Date(value);
												return date.toLocaleDateString("en-US", {
													month: "short",
													day: "numeric"
												});
											}}
										/>

										<YAxis tickLine={false} axisLine={false} tickMargin={2} tickCount={4} />

										<Area
											key={cssSafeName}
											dataKey={cssSafeName}
											type='basis'
											fill={`url(#fill${cssSafeName})`}
											stroke={`var(--color-${cssSafeName}, #ff3960)`}
											stackId='a'
										/>
									</AreaChart>
								</ChartContainer>
							</div>
						);
					})}
			</div>
		</div>
	);
}
