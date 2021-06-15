import Head from "next/head";
import Layout from "../layouts/DefaultLayout";
import DoubleGlowShadow from "../components/DoubleGlowShadow";
import NavLink from "../components/NavLink";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import OpenOrders from "../features/open-orders/OpenOrders";
import CompletedOrders from "../features/open-orders/CompletedOrders";

export default function OpenOrdersPage() {
  return (
    <Layout>
      <Head>
        <title>Open Orders | Sushi</title>
        <meta name="description" content="Open orders..." />
      </Head>
      <div className="max-w-2xl w-[1000px]">
        <div className="flex items-center gap-2 justify-start py-3">
          <ArrowLeftIcon
            width={20}
            height={20}
            className="text-high-emphesis"
          />
          <NavLink href="/limit-order">
            <a className="text-sm text-secondary">Back to Limit Orders</a>
          </NavLink>
        </div>
        <DoubleGlowShadow>
          <div
            id="limit-order-page"
            className="flex flex-col w-full p-8 rounded bg-dark-900 gap-4"
          >
            <OpenOrders />
            <CompletedOrders />
          </div>
        </DoubleGlowShadow>
      </div>
    </Layout>
  );
}
