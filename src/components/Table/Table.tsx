import React, { useState } from "react";
import style from "./table.module.scss";
import dayjs from "dayjs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import clsx from "clsx";
import { Loader } from "@/components/Loader/Loader.tsx";
import { Conversion } from "@/Models/Models.ts";

type Props = {
  conversions: Conversion[];
};

type TableRow = {
  conversion: Conversion;
};

export const Table: React.FC<Props> = ({ conversions }) => {
  const tableHeadItems = [
    "дата создания",
    "оффер",
    "гео/IP",
    "устройство",
    "статус",
    "доход",
    "название цели",
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sub5",
    "sub6",
    "sub7",
    "sub8",
    "user agent",
    "Id",
  ];

  const [sortOrder, setSortOrder] = useState("asc");
  const [isBlurred, setIsBlurred] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsBlurred(true);
    setTimeout(() => {
      setIsBlurred(false);
    }, 3000);
  };

  const handleSort = () => {
    setIsBlurred(true);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setTimeout(() => {
      setIsBlurred(false);
    }, 3000);
  };

  const filteredItems = conversions
    .filter((item) => item.id.toString().includes(searchTerm))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  const StatusComponent: React.FC<{ status: number }> = ({ status }) => {
    return (
      <div className={style.statusWrapper}>
        {status === 1 && <div className={style.status1}>ПРИНЯТО</div>}
        {status === 2 && <div className={style.status2}>в обработке</div>}
        {status === 3 && <div className={style.status3}>Статус 3</div>}
      </div>
    );
  };

  const TableRow: React.FC<TableRow> = ({ conversion }) => {
    return (
      <tr className={style.tableRow}>
        <td className={style.td}>
          {dayjs(conversion.date).format("DD-MM-YYYY HH:MM:ss")}
        </td>
        <td className={style.td}>{conversion.offer}</td>
        <td className={style.td}>
          <div className={style.tdFlex}>
            <img className={style.flag} src="/icons/flagRussia.svg" alt="" />
            <div className={style.tdGeo}>
              <div className={style.geoName}> {conversion.geo.name}</div>
              <div className={style.geoIp}> {conversion.geo.ip}</div>
            </div>
          </div>
        </td>
        <td className={style.td}>
          <div className={style.tdGeo}>
            <div className={style.geoIp}> {conversion.device.os}</div>
            <div className={style.geoName}> {conversion.device.agent}</div>
          </div>
        </td>
        <td className={style.td}>
          <StatusComponent status={conversion.status} />
        </td>
        <td className={style.td}>
          {conversion.income.amount} {conversion.income.currency}
        </td>
        <td className={style.td}>{conversion.goal}</td>
        <td className={style.td}>{conversion.sub1}</td>
        <td className={style.td}>{conversion.sub2}</td>
        <td className={style.td}>{conversion.sub3}</td>
        <td className={style.td}>{conversion.sub4}</td>
        <td className={style.td}>{conversion.sub5}</td>
        <td className={style.td}>{conversion.sub6}</td>
        <td className={style.td}>{conversion.sub7}</td>
        <td className={style.td}>{conversion.sub8}</td>
        <td className={style.td}>
          <div
            data-tooltip-id={conversion.id}
            className={style.iconUserAgent}
          ></div>
          <ReactTooltip
            className={style.tooltip}
            id={conversion.id}
            place="bottom"
            content={conversion.user_agent}
            data-tooltip-variant="light"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0px 4px 20px 0px rgba(93, 67, 255, 0.12)",
              width: "423px",
              whiteSpace: "wrap",
              color: "#000",
            }}
          />
        </td>
        <td className={style.td}>{conversion.id}</td>
      </tr>
    );
  };

  return (
    <>
      <div className={style.search}>
        <input
          className={style.inputSearch}
          type="text"
          placeholder="ID"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {filteredItems.length ? (
        <div className={style.wrapper}>
          {isBlurred && <Loader />}
          <table className={clsx(style.table, isBlurred ? style.blurred : "")}>
            <tbody>
              <tr className={style.headTr}>
                {tableHeadItems.map((item) => {
                  if (item === "дата создания") {
                    return (
                      <th key={item} className={style.th}>
                        <button
                          onClick={handleSort}
                          className={style.buttonSort}
                        >
                          <div className={style.buttonSortText}>{item}</div>
                          <img
                            className={clsx(
                              style.searchIcon,
                              sortOrder === "desc" && style.rotate,
                            )}
                            src="/icons/sortIcon.svg"
                            alt="Сортировка по дате"
                          />
                        </button>
                      </th>
                    );
                  }
                  return (
                    <th key={item} className={style.th}>
                      {item}
                    </th>
                  );
                })}
              </tr>
              {filteredItems.map((item) => (
                <TableRow key={item.id} conversion={item} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={style.empty}>Нет совпадений</div>
      )}
    </>
  );
};
