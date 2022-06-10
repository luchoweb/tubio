import Head from "next/head";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import { getStatsBiz } from "../../../../lib/api";

import PrivateLayout from "../../../../components/layouts/private";

function StatsProfile({ stats }) {
  console.log(stats);
  const titlePage = 'Estadísticas';

  const data = {
    labels: ['Hoy', 'Este mes', 'Este año'],
    datasets: [
      {
        label: `Visitas`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [stats.stats_data.visits, 0, 0]
      },
      {
        label: 'Impresiones',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,112,192,0.4)',
        borderColor: 'rgba(75,112,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,112,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,112,192,1)',
        pointHoverBorderColor: 'rgba(220,120,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [stats.stats_data.impressions, 0, 0, stats.stats_data.impressions]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container">
            <h3>{titlePage}</h3>

            <Chart
              type="bar"
              data={data}
              width={400}
              height={200}
            />
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const data = await getStatsBiz(query.id);

  return {
    props: {
      stats: data,
    }
  }
}

export default StatsProfile;