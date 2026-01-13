'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface ProductOutlineProps {
  src: string;
  alt?: string;
  threshold?: number;
  color?: string;
  thickness?: number;
  smooth?: boolean;
  className?: string;
}

export default function ProductOutline({
  src,
  alt = '产品轮廓图',
  threshold = 100,
  color = '#000000',
  thickness = 2,
  smooth = true,
  className = ''
}: ProductOutlineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [outline, setOutline] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sobel 边缘检测算法
  const detectEdges = useCallback((
    data: Uint8ClampedArray,
    width: number,
    height: number,
    thresh: number
  ): Uint8ClampedArray => {
    const output = new Uint8ClampedArray(data.length);

    // 转换为灰度图
    const gray = new Float32Array(width * height);
    for (let i = 0; i < data.length; i += 4) {
      const idx = i / 4;
      gray[idx] = (data[i] + data[i + 1] + data[i + 2]) / 3;
    }

    // Sobel 算子计算梯度
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;

        // Sobel X
        const gx =
          -gray[(y - 1) * width + (x - 1)] +
          gray[(y - 1) * width + (x + 1)] +
          -2 * gray[y * width + (x - 1)] +
          2 * gray[y * width + (x + 1)] +
          -gray[(y + 1) * width + (x - 1)] +
          gray[(y + 1) * width + (x + 1)];

        // Sobel Y
        const gy =
          -gray[(y - 1) * width + (x - 1)] +
          -2 * gray[(y - 1) * width + x] +
          -gray[(y - 1) * width + (x + 1)] +
          gray[(y + 1) * width + (x - 1)] +
          2 * gray[(y + 1) * width + x] +
          gray[(y + 1) * width + (x + 1)];

        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const edgeValue = magnitude > thresh ? 255 : 0;

        output[idx * 4] = edgeValue;
        output[idx * 4 + 1] = edgeValue;
        output[idx * 4 + 2] = edgeValue;
        output[idx * 4 + 3] = 255;
      }
    }

    return output;
  }, []);

  // 简化轮廓（Douglas-Peucker 算法简化）
  const simplifyContour = useCallback((
    edges: Uint8ClampedArray,
    width: number,
    height: number,
    tolerance: number
  ): void => {
    // 这里可以实现简化算法，当前版本保持原始轮廓
    // 如需简化，可以使用 ImageData 的形态学操作
  }, []);

  const generateOutline = useCallback(() => {
    setLoading(true);
    setError(null);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setLoading(false);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('无法获取 Canvas 上下文');
        setLoading(false);
        return;
      }

      // 限制最大尺寸以提升性能
      const maxSize = 1024;
      let w = img.width;
      let h = img.height;

      if (w > maxSize || h > maxSize) {
        const ratio = Math.min(maxSize / w, maxSize / h);
        w = Math.floor(w * ratio);
        h = Math.floor(h * ratio);
      }

      canvas.width = w;
      canvas.height = h;

      // 绘制原图
      ctx.drawImage(img, 0, 0, w, h);

      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, w, h);

      // 边缘检测
      const edges = detectEdges(imageData.data, w, h, threshold);

      // 如果需要平滑，可以在这里添加高斯模糊
      if (smooth) {
        // 平滑处理后的图像数据
      }

      // 创建新的 ImageData
      const contourImageData = new ImageData(edges, w, h);

      // 清空画布并绘制轮廓
      ctx.clearRect(0, 0, w, h);

      // 绘制轮廓点
      for (let i = 0; i < edges.length; i += 4) {
        if (edges[i] > 0) {
          const x = (i / 4) % w;
          const y = Math.floor((i / 4) / w);
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // 导出 PNG
      setOutline(canvas.toDataURL('image/png'));
      setLoading(false);
    };

    img.onerror = () => {
      setError('图片加载失败');
      setLoading(false);
    };
  }, [src, threshold, color, smooth, detectEdges]);

  useEffect(() => {
    generateOutline();
  }, [generateOutline]);

  return (
    <div className={`product-outline-container ${className}`}>
      {/* 隐藏的 Canvas 用于处理 */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {/* 状态显示 */}
      {loading && (
        <div className="loading-overlay">
          <span>处理中...</span>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <span>{error}</span>
        </div>
      )}

      {/* 轮廓结果 */}
      {outline && !error && (
        <div className="outline-result">
          <img
            src={outline}
            alt={alt}
            className="outline-image"
          />
        </div>
      )}

      {/* CSS 样式 */}
      <style jsx>{`
        .product-outline-container {
          position: relative;
          display: inline-block;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f9fafb;
        }

        .outline-result {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
        }

        .outline-image {
          max-width: 100%;
          height: auto;
          display: block;
        }

        .loading-overlay,
        .error-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(249, 250, 251, 0.9);
          color: #6b7280;
          font-size: 14px;
        }

        .error-overlay {
          color: #ef4444;
        }
      `}</style>
    </div>
  );
}
