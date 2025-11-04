import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "./constants";

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 100,
  textAlign: "center",
  position: "absolute",
  bottom: 160,
  width: "100%",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Title: React.FC<{
  readonly titleText: string;
  readonly titleColor: string;
}> = ({ titleText, titleColor }) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const words = titleText.split(" ");

  return (
    <h1 style={title}>
      {words.map((t, i) => {
        const delay = i * 8; // 增加延迟使效果更明显

        // 主要缩放动画
        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 150,
          },
        });

        // 波浪动画：每个词不同的波浪相位
        const waveOffset = Math.sin((frame + i * 15) / 20) * 10;

        // 透明度闪烁效果
        const opacityPulse = Math.sin((frame + i * 10) / 30) * 0.3 + 0.7;

        // 旋转微调
        const slightRotation = Math.sin((frame + i * 20) / 40) * 3;

        // 颜色亮度变化
        const brightness = Math.sin((frame + i * 12) / 35) * 0.2 + 1;

        return (
          <span
            key={t}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale}) translateY(${waveOffset}px) rotate(${slightRotation}deg)`,
              opacity: opacityPulse,
              filter: `brightness(${brightness})`,
              textShadow: `0 0 ${20 * scale}px ${titleColor}40`, // 发光效果
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
