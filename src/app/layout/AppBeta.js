import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { appColors } from "../../colors";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "./Loading/Loading";

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
    ha: appColors.horizonText.ha,
    portfolio: appColors.horizonText.portfolio,
    postPortfolio: appColors.horizonText.postPortfolio,
  };

  /** Loading Overlay */
  if (loadingTargetDash) {
    return <Loading />;
  }

  var targetData = [];
  var screenData = [];
  var haData = [];
  var portfolioData = [];
  var postPortfolioData = [];

  let showLabel = true;

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
      if (element.currentStage === "HA") {
        haData.push([
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
        data: ["Target", "Screen", "HA", "Portfolio", "PostPortfolio"],
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
          label: {
            formatter: function (param) {
              return param.data[3];
            },
            position: "top",
            show: showLabel,
            fontSize: 8,
          },
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
          label: {
            formatter: function (param) {
              return param.data[3];
            },
            position: "top",
            show: showLabel,
            fontSize: 8,
          },

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
          name: "HA",
          data: haData,
          type: "scatter",
          label: {
            formatter: function (param) {
              return param.data[3];
            },
            position: "top",
            show: showLabel,
            fontSize: 8,
          },
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
            color: nodeColors.ha,
          },
        },
        {
          name: "Portfolio",
          data: portfolioData,
          type: "scatter",
          label: {
            formatter: function (param) {
              return param.data[3];
            },
            position: "top",
            show: showLabel,
            fontSize: 8,
          },
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
          label: {
            formatter: function (param) {
              return param.data[3];
            },
            position: "top",
            show: showLabel,
            fontSize: 8,
          },
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
