'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import Graph from '@/components/data-visualization/Graph';
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

  const currentDate = useMemo(() => {
    return new Date();
  }, []);

  const queries = useMemo(() => {
    const queries = Array.from({ length: 31 }, (_, i) => {
      const currentDateFormatted = format(
        subDays(currentDate, i),
        'yyyy-MM-dd'
      );
      return {
        queryKey: [`currency-${currency}-${currentDateFormatted}`],
        queryFn: async () => {
          const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${currentDateFormatted}/v1/currencies/eur.json`
          );
          return await response.json();
        },
        staleTime: Infinity,
      };
    });
    return queries;
  }, [currency, currentDate]);

  const results = useQueries({ queries });

  const dataArray = results.map((result) => result.data);

  console.log(dataArray);

  const currencyData = useMemo<Serie>(() => {
    let data: Datum[] = [];
    let result: Serie;
    if (dataArray && dataArray.length > 0) {
      data = dataArray.map((data, index) => {
        if (data && data.eur && data.eur[currency]) {
          return {
            x: index,
            y: data.eur[currency],
          };
        } else {
          return {
            x: null,
            y: null,
          };
        }
      });
    }
    result = {
      id: currency,
      color: `hsl(${Math.random() * 100}, 70%, 50%)`,
      data: data,
    };

    return result;
  }, [currency, dataArray]);

  // if (isPending) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="prose prose-invert mx-auto">
      <h1 className="text-center">Currency</h1>
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
        <Select value={currency} onValueChange={setCurrency}>
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
        {/* Current Value: {graphData ? graphData.eur.usd : 'Hi'} */}
      </div>

      <Select defaultValue="month">
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
      {currencyData ? <Graph data={[currencyData]} /> : ''}
    </div>
  );
};

export default CurrencyGraph;
