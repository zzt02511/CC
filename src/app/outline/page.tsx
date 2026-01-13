'use client';

import { useState } from 'react';
import ProductOutline from '@/components/ProductOutline';

// 测试图片列表
const testImages = [
  { name: '示例图片 1', src: '/products/test1.png' },
  { name: '示例图片 2', src: '/products/test2.png' },
  { name: '示例图片 3', src: '/products/test3.png' },
];

export default function OutlinePage() {
  const [selectedImage, setSelectedImage] = useState(testImages[0].src);
  const [threshold, setThreshold] = useState(100);
  const [color, setColor] = useState('#000000');
  const [thickness, setThickness] = useState(2);
  const [smooth, setSmooth] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 页面标题 */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            产品轮廓图生成器
          </h1>
          <p className="text-gray-600">
            上传产品图片，自动提取边缘生成轮廓图
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 图片选择 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                选择图片
              </h2>
              <div className="space-y-2">
                {testImages.map((img) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(img.src)}
                    className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                      selectedImage === img.src
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {img.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 参数设置 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                轮廓参数
              </h2>

              {/* 阈值滑块 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  边缘检测阈值: {threshold}
                </label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  较低值：更多细节 | 较高值：更清晰的轮廓
                </p>
              </div>

              {/* 轮廓颜色 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  轮廓颜色
                </label>
                <div className="flex gap-2">
                  {['#000000', '#ff0000', '#0066ff', '#00cc00', '#ff6600'].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          color === c ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    )
                  )}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* 线条粗细 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  线条粗细: {thickness}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={thickness}
                  onChange={(e) => setThickness(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 平滑选项 */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  平滑轮廓
                </label>
                <button
                  onClick={() => setSmooth(!smooth)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    smooth ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      smooth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 下载按钮 */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              下载轮廓图 (PNG)
            </button>
          </div>

          {/* 右侧：预览区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                预览效果
              </h2>

              {/* 原图对比 */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  原图
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-center items-center h-48 bg-gray-100 rounded">
                    <span className="text-gray-500">
                      请将图片上传到 public/products/ 目录
                    </span>
                  </div>
                </div>
              </div>

              {/* 轮廓结果 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  轮廓结果
                </h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-white min-h-[300px] flex items-center justify-center">
                  {selectedImage ? (
                    <ProductOutline
                      src={selectedImage}
                      alt="产品轮廓图"
                      threshold={threshold}
                      color={color}
                      thickness={thickness}
                      smooth={smooth}
                    />
                  ) : (
                    <span className="text-gray-500">
                      请选择或上传一张图片
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            使用说明
          </h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>将产品图片放入 <code>public/products/</code> 目录</li>
            <li>支持 PNG、JPG 格式</li>
            <li>建议使用透明背景图片以获得最佳效果</li>
            <li>调整阈值可以控制轮廓的精细程度</li>
            <li>点击「下载轮廓图」保存 PNG 文件</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
