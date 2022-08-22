import React, { useState, useEffect, useContext } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { observer } from "mobx-react-lite";
import { Slider } from "primereact/slider";
import { useNavigate } from "react-router-dom";
import history from "../../../../history";
import { appColors } from "../../../../colors";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Loading from "../../../../app/layout/Loading/Loading";

const TargetDashChart = ({ targets }) => {
  const navigate = useNavigate();

  /* MobX Store */
  const rootStore = useContext(RootStoreContext);
  const { loadingTargetDash, targetDash, loadTargetDash } =
    rootStore.dataViewStore;

  useEffect(() => {
    console.log("AppBeta: fetchTargetList()");
    if (targetDash === null) loadTargetDash();
  }, [targetDash, loadTargetDash]); // eslint-disable-line react-hooks/exhaustive-deps

  const [likeScoreCutoff, setLikeScoreCutoff] = useState(0.02);
  const [impactScoreCutoff, setImpactScoreCutoff] = useState(0.02);
  /** Loading Overlay */
  if (loadingTargetDash) {
    return <Loading />;
  }

  let nodeColors = {
    target: appColors.horizonText.target,
    screen: appColors.horizonText.screen,
    fha: appColors.horizonText.fha,
    portfolio: appColors.horizonText.portfolio,
    postPortfolio: appColors.horizonText.postPortfolio,
  };

  var targetData = [];
  var screenData = [];
  var fhaData = [];
  var portfolioData = [];
  var postPortfolioData = [];

  let showLabel = true;

  if (!loadingTargetDash && targetDash !== null) {
    targetDash.forEach((element) => {
      if (
        element.likeScore >= likeScoreCutoff &&
        element.impactScore >= impactScoreCutoff
      ) {
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
          name: "FHA",
          data: fhaData,
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
            color: nodeColors.fha,
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
        <div>
          <div style={{ height: "650px", width: "650px", marginTop: "20px" }}>
            <ReactECharts
              option={option}
              // onEvents={onEvents}
              style={{ height: "650px", width: "650px" }}
            />
          </div>
          <div
            style={{
              padding: "0px 60px 0px 60px",
              margin: "-40px 0px 0px 0px",
            }}
          >
            <h4>
              <i className="icon icon-common icon-filter" /> Filters
            </h4>
            <h5>Likelihood Score: {likeScoreCutoff}</h5>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={likeScoreCutoff}
              onChange={(e) => setLikeScoreCutoff(e.value)}
            />
            <h5>Biological Impact Score: {impactScoreCutoff}</h5>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={impactScoreCutoff}
              onChange={(e) => setImpactScoreCutoff(e.value)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  console.log("START generating graphdata");

  // targets.forEach((target) => {
  //   if (
  //     target.likeScore >= likeScoreCutoff &&
  //     target.impactScore >= impactScoreCutoff
  //   ) {
  //     graphData.push([
  //       target.likeScore,
  //       target.impactScore,
  //       target.name,
  //       target.id,
  //     ]);
  //   }
  // });

  // console.log(graphData);
  console.log("END generating graphdata");

  return <h2>Wait..</h2>;
};

export default observer(TargetDashChart);
