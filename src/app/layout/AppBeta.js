import React, { useEffect, useContext } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "./Loading/Loading";
import { appColors } from "../../colors";

const AppBeta = () => {
  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingTargetDash, targetDash, loadTargetDash } =
    rootStore.dataViewStore;

  useEffect(() => {
    console.log("AppBeta: fetchTargetList()");
    if (targetDash === null) loadTargetDash();
  }, [targetDash, loadTargetDash]); // eslint-disable-line react-hooks/exhaustive-deps

  let nodeColors = {
    target: appColors.horizonText.target,
    screen: appColors.horizonText.screen,
    fha: appColors.horizonText.fha,
    portfolio: appColors.horizonText.portfolio,
    postPortfolio: appColors.horizonText.postPortfolio,
  };

  /** Loading Overlay */
  if (loadingTargetDash) {
    return <Loading />;
  }

  var targetData = [];
  var screenData = [];
  var fhaData = [];
  var portfolioData = [];
  var postPortfolioData = [];

  if (!loadingTargetDash && targetDash !== null) {
    targetDash.forEach((element) => {
      if (element.currentStage === "Target") {
        targetData.push([
          element.likeScore,
          element.impactScore,
          element.id,
          element.name,
          element.type,
          element.bucket,
          element.currentStage,
        ]);
      }
      if (element.currentStage === "Screen") {
        screenData.push([
          element.likeScore,
          element.impactScore,
          element.id,
          element.name,
          element.type,
          element.bucket,
          element.currentStage,
        ]);
      }
      if (element.currentStage === "FHA") {
        fhaData.push([
          element.likeScore,
          element.impactScore,
          element.id,
          element.name,
          element.type,
          element.bucket,
          element.currentStage,
        ]);
      }
      if (element.currentStage === "Portfolio") {
        portfolioData.push([
          element.likeScore,
          element.impactScore,
          element.id,
          element.name,
          element.type,
          element.bucket,
          element.currentStage,
        ]);
      }
      if (element.currentStage === "PostPortfolio") {
        postPortfolioData.push([
          element.likeScore,
          element.impactScore,
          element.id,
          element.name,
          element.type,
          element.bucket,
          element.currentStage,
        ]);
      }
    });

    let option = {
      backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: "#fff",
        },
        {
          offset: 1,
          color: "#eee",
        },
      ]),
      title: {
        text: "Target map",
        left: "5%",
        top: "3%",
      },
      legend: {
        right: "10%",
        top: "3%",
        data: ["Target", "Screen", "FHA", "Portfolio", "PostPortfolio"],
      },
      grid: {
        left: "8%",
        top: "10%",
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
        scale: true,
      },
      series: [
        {
          name: "Target",
          data: targetData,
          type: "scatter",
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: nodeColors.target,
          },
        },
        {
          name: "Screen",
          data: screenData,
          type: "scatter",

          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(25, 100, 150, 0.5)",
            shadowOffsetY: 5,
            color: nodeColors.screen,
          },
        },
        {
          name: "FHA",
          data: fhaData,
          type: "scatter",
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: nodeColors.fha,
          },
        },
        {
          name: "Portfolio",
          data: portfolioData,
          type: "scatter",
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: nodeColors.portfolio,
          },
        },
        {
          name: "PostPortfolio",
          data: postPortfolioData,
          type: "scatter",
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param) {
                return param.data[3];
              },
              position: "top",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: nodeColors.postPortfolio,
          },
        },
      ],
    };

    console.log(targetDash);

    return (
      <React.Fragment>
        <ReactECharts
          option={option}
          // onEvents={onEvents}
          style={{ height: "50rem", width: "50rem" }}
        />
      </React.Fragment>
    );
  }

  return (
    <div>
      <h2>Wait...</h2>
    </div>
  );
};

export default observer(AppBeta);
