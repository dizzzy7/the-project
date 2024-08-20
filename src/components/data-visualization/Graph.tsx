'use client';

import React from 'react';

import { Serie } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import dynamic from 'next/dynamic';

const ResponsiveLine = dynamic(
  () => import('@nivo/line').then((m) => m.ResponsiveLine),
  { ssr: false }
);

interface LineChartProps {
  data: Serie[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div style={{ height: 400 }} className="not-prose">
      <ResponsiveLine
        lineWidth={4}
        onTouchStart={(point, event) => {
          console.log(`This point got clicked`);
          console.log(point);
        }}
        enableGridX={false}
        enablePoints={false}
        theme={{
          text: {
            fill: '#fff',
          },
          tooltip: {
            container: {
              color: 'black',
              fontSize: 12,
            },
          },
        }}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(255, 255, 255, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: '#000000' },
            { offset: 100, color: '#ffffff' },
          ]),
        ]}
        fill={[{ match: '*', id: 'gradientA' }]}
      />
    </div>
  );
};

export default LineChart;
