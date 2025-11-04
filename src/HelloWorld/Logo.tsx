import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Arc } from "./Arc";
import { Atom } from "./Atom";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const myCompSchema2 = z.object({
  logoColor1: zColor(),
  logoColor2: zColor(),
});

export const Logo: React.FC<z.infer<typeof myCompSchema2>> = ({
  logoColor1: color1,
  logoColor2: color2,
}) => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // 多阶段动画系统
  const development = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  const rotationDevelopment = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  // 复杂的缩放动画：脉冲效果
  const scalePulse = spring({
    frame: frame % 60, // 每2秒循环一次
    config: {
      damping: 20,
      mass: 1,
    },
    fps: videoConfig.fps,
  });

  // 基础缩放
  const baseScale = spring({
    frame,
    config: {
      mass: 0.8,
    },
    fps: videoConfig.fps,
  });

  const scale = 0.8 + scalePulse * 0.2; // 脉冲范围 0.8-1.0

  // 复杂旋转动画：加速-减速-反向
  const logoRotation = interpolate(
    frame,
    [0, 90, 180, 270, 300], // 关键帧点
    [0, 180, 360, 540, 720], // 旋转角度
  );

  // 位置动画：呼吸感移动
  const breatheX = Math.sin(frame / 30) * 20; // 左右摆动
  const breatheY = Math.cos(frame / 40) * 15; // 上下浮动

  // 颜色过渡动画（为未来预留）
  const colorShift = Math.sin(frame / 60) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) rotate(${logoRotation}deg) translate(${breatheX}px, ${breatheY}px)`,
      }}
    >
      <Arc
        rotateProgress={rotationDevelopment}
        progress={development}
        rotation={30}
        color1={color1}
        color2={color2}
      />
      <Arc
        rotateProgress={rotationDevelopment}
        rotation={90}
        progress={development}
        color1={color1}
        color2={color2}
      />
      <Arc
        rotateProgress={rotationDevelopment}
        rotation={-30}
        progress={development}
        color1={color1}
        color2={color2}
      />
      <Atom scale={rotationDevelopment} color1={color1} color2={color2} />
    </AbsoluteFill>
  );
};
