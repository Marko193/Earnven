import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import parse from "html-react-parser";
// import {useParams} from 'react-router-dom';
// import TransparentButton from '../TransparentButton/index'
import {
  // ChartDataTwentyFour,
  ChartDataOneWeek,
  // ChartDataOneMonth,
} from './ChartDataFetch/ChartDataFetch'
// import { MobileView, BrowserView } from 'react-device-detect';

export const Chart = ({tokenid}) => {

  const [Price, setPrice] = useState(null)
  const [Selection, setSelection] = useState(null)
  // const [View, setView] = useState('Month View')

  // const [Token, setToken] = useState('aave')

  React.useEffect(() => {
    
    // console.log(tokenid)
    // console.log(tokenid)
    axios.get(`https://api.coingecko.com/api/v3/coins/${tokenid}`,{},{})
        .then(async(response) => {
            // console.log(response.data)
            setSelection(response.data)
    })
    // setView('Week View')

    if(tokenid!=='' && tokenid!==null && tokenid!==undefined){
      
      console.log(1, tokenid)
      ChartDataOneWeek(tokenid).then((res) => {
        setPrice(res)
        // console.log(Price)
      })

    }
    

  }, [tokenid]);

  useEffect(() => {
    
  }, [])

  let data
  //to set coin price we get from coingecko api
  Price
    ? (data = [
        {
          id: 'japan',
          color: 'hsl(214, 70%, 50%)',
          data: Price,
        },
      ])
    : (data = [
        {
          id: 'japan',
          color: 'hsl(72, 70%, 50%)',
          data: [
            {
              x: 'plane',
              y: 97,
            },
            {
              x: 'helicopter',
              y: 230,
            },
            {
              x: 'boat',
              y: 45,
            },
            {
              x: 'train',
              y: 174,
            },
            {
              x: 'subway',
              y: 203,
            },
            {
              x: 'bus',
              y: 158,
            },
            {
              x: 'car',
              y: 152,
            },
            {
              x: 'moto',
              y: 227,
            },
            {
              x: 'bicycle',
              y: 120,
            },
            {
              x: 'horse',
              y: 51,
            },
            {
              x: 'skateboard',
              y: 176,
            },
            {
              x: 'others',
              y: 290,
            },
          ],
        },
      ])
  return (
    <div>

      {Selection ? (

        <div style={{width:'80%', margin:'auto'}}>

        <div style={{height: '230px',
         
         }}>
                       
          <ResponsiveLine
            data={data}
            margin={{  right: 20, bottom: 100, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Price (USD)',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            enablePoints={false}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'dark2' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            enableArea={true}
            areaOpacity={0.85}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
          />
          
        </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
