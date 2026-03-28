'use client';

import { useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import Graph from '@/components/data-visualization/Graph';
import { Serie } from '@nivo/line';
import {
  format,
  getDaysInMonth,
  getDaysInYear,
  subDays,
  subMonths,
} from 'date-fns';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * TODO IDEA: add a way to save the already made requests to populate own DB
 * - first connect to mongodb and check if entry exists for (currency, time/times)
 * - if there are times missing, get those times and persist them in the mongodb storage
 *
 * CURRENCY API USAGE NOTE:
 * get current value of currency:
 * 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
 *
 * get past value of currency:
 * 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@YYYY-MM-DD/v1/currencies/eur.json'
 */

const CurrencyGraph = () => {
  const [currency, setCurrency] = useState('usd');
  type DateRange = 'month' | 'threeMonths' | 'sixMonths' | 'aYear';

  const currentDate = useMemo(() => {
    return subDays(new Date(), 1);
  }, []);

  const dateRanges = useMemo(() => {
    return {
      month: getDaysInMonth(currentDate),
      threeMonths:
        getDaysInMonth(currentDate) +
        getDaysInMonth(subMonths(currentDate, 1)) +
        getDaysInMonth(subMonths(currentDate, 2)),
      sixMonths:
        getDaysInMonth(currentDate) +
        getDaysInMonth(subMonths(currentDate, 1)) +
        getDaysInMonth(subMonths(currentDate, 2)) +
        getDaysInMonth(subMonths(currentDate, 3)) +
        getDaysInMonth(subMonths(currentDate, 4)) +
        getDaysInMonth(subMonths(currentDate, 5)),
      aYear: getDaysInYear(currentDate),
    };
  }, []);

  // const [resultingCurrencyData, setResultingCurrencyData] = useState<
  //   Serie | undefined
  // >(undefined);

  const [currentDateRange, setCurrentDateRange] = useState<DateRange>('month');

  const relevantDates = useMemo(() => {
    const dates = Array.from(
      { length: dateRanges[currentDateRange] },
      (_, i) => {
        return subDays(currentDate, i);
      },
    );

    return dates.reverse();
  }, [currentDate, currentDateRange, dateRanges]);

  const queries = useMemo(() => {
    return relevantDates.map((relevantDate, index) => {
      const relevantDateFormatted = format(relevantDate, 'yyyy-MM-dd');
      return {
        queryKey: [`currency-${currency}-${relevantDateFormatted}`],
        queryFn: async () => {
          const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${
              index === 0 ? 'latest' : relevantDateFormatted
            }/v1/currencies/eur.json`,
          );
          return await response.json();
        },
        staleTime: Infinity,
      };
    });
  }, [currency, relevantDates]);

  const results = useQueries({ queries });

  const dataArray = results.map((result) => result.data);

  const areQueriesReady = useMemo(() => {
    for (let index = 0; index < dataArray.length; index++) {
      const element = dataArray[index];
      if (element === undefined) {
        return false;
      }
    }
    return true;
  }, [dataArray]);

  let resultingCurrencyData: Serie | undefined;
  let data;

  if (dataArray.indexOf(undefined) === -1) {
    data = dataArray.map((data, index) => {
      return {
        x: format(relevantDates[index], 'dd.MM.yy'),
        y: data.eur[currency],
      };
    });

    resultingCurrencyData = {
      id: currency,
      color: `hsl(${Math.random() * 100}, 70%, 50%)`,
      data: data,
    };
  }

  return (
    <div className="prose prose-invert mx-auto">
      <h1 className="text-center mt-16">Currency Graph</h1>
      <div className="flex items-center space-x-3 justify-center">
        <Select disabled defaultValue={'EUR'}>
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR - Euro</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-white">to</span>
        <Select
          value={currency}
          onValueChange={(value) => {
            setCurrency(value);
          }}
        >
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD - Dollar</SelectItem>
            <SelectItem value="try">TRY - Turkish Lira</SelectItem>
            <SelectItem value="eth">ETH - Ethereum</SelectItem>
            <SelectItem value="btc">BTC - Bitcoin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-3 justify-center mt-4 w-full">
        <Select
          value={currentDateRange}
          onValueChange={(value: DateRange) => setCurrentDateRange(value)}
        >
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="threeMonths">Past 3 Months</SelectItem>
            <SelectItem value="sixMonths">Past 6 Months</SelectItem>
            <SelectItem value="aYear">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* TODO: add proper ticks on the x and y axis */}
      {resultingCurrencyData !== undefined && areQueriesReady ? (
        <Graph data={[resultingCurrencyData]} />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default CurrencyGraph;
