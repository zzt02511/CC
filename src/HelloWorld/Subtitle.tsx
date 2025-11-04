import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLOR_1, FONT_FAMILY } from "./constants";

const subtitle: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontSize: 40,
  textAlign: "center",
  position: "absolute",
  bottom: 140,
  width: "100%",
};

const codeStyle: React.CSSProperties = {
  color: COLOR_1,
};

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();

  // 多阶段透明度动画：淡入-闪烁-保持-闪烁-淡出
  const opacity = interpolate(
    frame,
    [0, 30, 100, 130, 200, 230, 270, 300],
    [0, 1, 1, 0.3, 0.3, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 打字机效果的分段显示
  const textSegments = [
    { text: "Edit ", delay: 0 },
    { text: "src/Root.tsx", delay: 20 },
    { text: " and save to reload.", delay: 40 }
  ];

  // 整体位移动画
  const slideOffset = interpolate(
    frame,
    [0, 30],
    [50, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 闪烁效果
  const blinkIntensity = Math.sin(frame / 15) * 0.5 + 0.5;

  return (
    <div
      style={{
        ...subtitle,
        opacity,
        transform: `translateY(${slideOffset}px)`,
      }}
    >
      {textSegments.map((segment, index) => {
        const segmentOpacity = interpolate(
          frame - segment.delay,
          [0, 15],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const isCode = segment.text.includes("src/");

        return (
          <span
            key={index}
            style={{
              opacity: segmentOpacity,
              display: "inline-block",
              transition: "all 0.3s ease",
              color: isCode ? COLOR_1 : undefined,
              backgroundColor: isCode ? `${COLOR_1}20` : undefined,
              padding: isCode ? "2px 8px" : undefined,
              borderRadius: isCode ? "4px" : undefined,
              fontFamily: isCode ? "monospace" : FONT_FAMILY,
              transform: `scale(${1 + blinkIntensity * 0.02})`,
              textShadow: `0 0 ${10 * blinkIntensity}px ${COLOR_1}40`,
            }}
          >
            {segment.text}
          </span>
        );
      })}
    </div>
  );
};
