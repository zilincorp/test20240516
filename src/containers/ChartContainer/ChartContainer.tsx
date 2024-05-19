import React, { useEffect, useState } from "react";
import style from "./chartContainer.module.scss";
import { Table } from "@/components/Table/Table.tsx";
import { Chart } from "@/components/Chart/Chart.tsx";
import axios from "axios";
import { Loader } from "@/components/Loader/Loader.tsx";

export const ChartContainer: React.FC = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = "xp";
      const password = "xp";
      const token = btoa(`${username}:${password}`);

      try {
        const response = await axios.get(
          "https://admin.x-partners.com/api/test/data/",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          },
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.headerWrapper}>
        <div className={style.header}>
          <button>
            <img src="/img/Frame.png" alt="" />
          </button>
          <button>
            <span>name@x-parters.com</span>
            <img src="/icons/exit.svg" />
          </button>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.title}>Dashboard</div>
        {!data ? (
          <Loader />
        ) : (
          <>
            <div className={style.chartWrapper}>
              <div className={style.chartTitle}>
                Статистика за последние 10 дней
              </div>
              <Chart statistics={data?.statistics} />
            </div>
            <div className={style.table}>
              <div className={style.wrapperTable}>
                <Table conversions={data?.conversions} />
              </div>
            </div>
          </>
        )}
      </div>
      <div className={style.footer}>
        <div className={style.footerWrapper}>
          <div className={style.footerNav}>
            <a className={style.footerLogo}>
              <img src="/img/footerLogo.svg" alt="" />
            </a>
            <div className={style.footerMenu}>
              <a href="#">API</a>
              <a href="#">menu</a>
              <a href="#">menu</a>
              <a href="#">menu</a>
              <a href="#">menu</a>
            </div>
          </div>
        </div>
        <div className={style.copywrite}>
          IT Solutions FZCO оперирует платформой x-partners и осуществляет
          взаимодействие с контрагентами платформы. IFZA Dubai – Building A2, A
          311C, Dubai, UAE Dubai United Arab Emirates
        </div>
      </div>
    </div>
  );
};
