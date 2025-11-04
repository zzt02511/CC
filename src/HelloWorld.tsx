import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "./HelloWorld/Logo";
import { Subtitle } from "./HelloWorld/Subtitle";
import { Title } from "./HelloWorld/Title";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  logoColor1: zColor(),
  logoColor2: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
  titleText: propOne,
  titleColor: propTwo,
  logoColor1,
  logoColor2,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Logo上移动画：分阶段进行
  const logoTranslationProgress = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 120,
    },
  });

  // Logo多阶段移动：先上，再微调，最后稳定
  const logoTranslation = interpolate(
    frame,
    [0, 60, 180, 240, 300],
    [0, -120, -140, -130, -135],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 整体透明度：分阶段淡入淡出
  const opacity = interpolate(
    frame,
    [0, 20, 260, 280, 300],
    [0, 1, 1, 0.5, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 背景颜色渐变
  const backgroundColor = interpolate(
    frame,
    [0, 100, 200, 300],
    [
      0, // 开始时纯白
      0.1, // 稍微偏蓝
      0.05, // 回到接近白色
      0, // 结束时纯白
    ]
  );

  const bgColor = `rgba(135, 206, 250, ${backgroundColor})`; // 淡蓝色背景

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: bgColor }}>
      <AbsoluteFill style={{ opacity }}>
        <AbsoluteFill style={{ transform: `translateY(${logoTranslation}px)` }}>
          <Logo logoColor1={logoColor1} logoColor2={logoColor2} />
        </AbsoluteFill>
        {/* Sequences can shift the time for its children! */}
        <Sequence from={45}>
          <Title titleText={propOne} titleColor={propTwo} />
        </Sequence>
        {/* The subtitle will only enter on the 90th frame. */}
        <Sequence from={90}>
          <Subtitle />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
