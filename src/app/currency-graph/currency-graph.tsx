'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import LineChart from '@/components/data-visualization/Graph';
import { Datum, Serie } from '@nivo/line';
import { format, getDaysInMonth, subDays } from 'date-fns';

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
  const [timeSpan, setTimeSpan] = useState('month');

  const currentDate = useMemo(() => {
    return subDays(new Date(), 1);
  }, []);

  const relevantDates = useMemo(() => {
    let dates;

    if (timeSpan === '3month') {
      dates = Array.from({ length: 92 }, (_, i) => {
        return subDays(currentDate, i);
      });
    } else if (timeSpan === '6month') {
      dates = Array.from({ length: 183 }, (_, i) => {
        return subDays(currentDate, i);
      });
    } else if (timeSpan === 'year') {
      dates = Array.from({ length: 365 }, (_, i) => {
        return subDays(currentDate, i);
      });
    } else {
      dates = Array.from({ length: 31 }, (_, i) => {
        return subDays(currentDate, i);
      });
    }

    return dates.reverse();
  }, [currentDate, timeSpan]);

  const queries = useMemo(() => {
    return relevantDates.map((relevantDate, index) => {
      const relevantDateFormatted = format(relevantDate, 'yyyy-MM-dd');
      return {
        queryKey: [`currency-${currency}-${relevantDateFormatted}`],
        queryFn: async () => {
          const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${index === 0 ? 'latest' : relevantDateFormatted
            }/v1/currencies/eur.json`
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
      <div className="text-white text-center">
      </div>

      <div className='flex items-center mt-4 justify-center'>
        <span className='mr-4'>Timespan:</span>
        <Select
          value={timeSpan}
          defaultValue="month"
          onValueChange={(value) => {
            setTimeSpan(value)
          }}
        >
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="3month">Past 3 Months</SelectItem>
            <SelectItem value="6month">Past 6 Months</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* TODO: add proper ticks on the x and y axis */}
      {resultingCurrencyData !== undefined && (
        <LineChart
          data={[resultingCurrencyData]}
        />
      )}
    </div>
  );
};

export default CurrencyGraph;
