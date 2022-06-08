import Head from "next/head";
import Link from "next/link";

import { getTransactionDetails } from "../../../lib/api";
import { epaycoStatusColor } from "../../../helpers";

import PrivateLayout from "../../../components/layouts/private";

function PayConfirmation({ info }) {
  const titlePage = 'Confirmación del pago';

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section className="pay-info">
          <div className="container">
            <h3 className="text-center">{titlePage}</h3>

            <div className="d-flex flex-column gap-2 mt-5 align-items-center justify-content-center">
              { info?.success && (
                <div>
                {info?.data?.response === 'Aprobada' ? (
                  <i className={`icon icon-big icon-check-circle text-${epaycoStatusColor(info?.data?.status)}`}></i>
                ) : (
                  <i className={`icon icon-big icon-warning text-${epaycoStatusColor(info?.data?.status)}`}></i>
                )}
                </div>
              )}
              <div>
              { info?.success ? (
                <div className="text-center">
                  <h4 className={`m-0 mb-4 text-${epaycoStatusColor(info?.data?.status)}`}>
                    {info?.data?.response}
                  </h4>
                  <p className="m-0 mt-2">
                    <small>
                      <strong>Referencia</strong>: {info?.data?.referencePayco}
                    </small>
                  </p>
                  <p className="m-0">
                    <small>
                      <strong>Valor</strong>: ${info?.data?.dollars} USD
                    </small>
                  </p>
                  <p className="m-0">
                    <small>
                      <strong>Dirección IP</strong>: {info?.data?.ip}
                    </small>
                  </p>

                  {info?.data?.status === 'Aceptada' && (
                    <Link href="/admin/profile/paid">
                      <a className="btn btn-dark mt-5">
                        <i className="icon icon-user-plus me-2"></i>
                        <span>Crear perfil</span>
                      </a>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="alert alert-danger">
                  <h4 className="mb-3 fw-normal">Ha fallado la comunicación con la pasarela de pagos.</h4>
                  <p className="mb-0">Por favor escribir a nuestro <a href="https://wa.me/573008291060" target="_blank" rel="noopener" className="alert-link">WhatsApp</a> y proporcionar la referencia de pago <strong>{info?.referencePayco}</strong> para ayudarle de manera ágil.</p>
                </div>
              )}
              </div>
            </div>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const info = {
    body: '',
    data: {
      success: false,
      referencePayco: null
    }
  }

  if (req.method == "POST") {
    req.on('data', (chunk) => {
      info.body += chunk
    });

    req.on('end', () => {
      const params = new URLSearchParams(info.body);
      info.data.referencePayco = params.get('x_ref_payco');
    });
  }

  function getReferencePayco() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(info.data.referencePayco);
      }, 2000);
    });
  }
  
  const referencePayco = await getReferencePayco();
  const transaction = await getTransactionDetails(referencePayco);

  return {
    props: {
      info: transaction.success ? transaction : { success: false, referencePayco: query['ref_payco'] }
    }
  }
}

export default PayConfirmation;
