'use client';

import React from 'react';

import { Serie, ResponsiveLine } from '@nivo/line';

interface LineChartProps {
  data: Serie[];
  ticksX?: String[];
  ticksY?: String[];
}

const LineChart: React.FC<LineChartProps> = ({ data, ticksX, ticksY }) => {
  return (
    <div style={{ height: 400 }} className="not-prose">
      <ResponsiveLine
        lineWidth={3}
        enableGridX={false}
        enablePoints={false}
        theme={{
          crosshair: {
            line: {
              stroke: '#FFF',
            },
          },
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
          legendOffset: 36,
          legendPosition: 'middle',
          tickValues: ticksX || undefined,
          format: (value) => {
            if (typeof value === 'string') {
              const firstVisibleDay = data[0].data[0].x
                ?.toString()
                .split('.')[0];
              const firstVisibleDayAsNumber = Number(firstVisibleDay);
              const extractedDay = value.split('.')[0];
              const numberValue = Number(extractedDay);
              if (numberValue % 10 === firstVisibleDayAsNumber % 10) {
                const result = value.split('.');
                result.pop();
                return result.join('.');
              } else {
                return '';
              }
            } else {
              return value;
            }
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: ticksY || undefined,
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
      />
    </div>
  );
};

export default LineChart;
