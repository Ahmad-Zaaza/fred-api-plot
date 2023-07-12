import { useEffect, useRef } from "react";
import { init, getInstanceByDom } from "echarts";
import type { EChartsOption } from "echarts";

export const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => {
    const instance = getInstanceByDom(target as HTMLElement);
    if (instance) {
      instance.resize();
    }
  });
});

const Chart = ({ options }: { options: EChartsOption }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const PrimaryColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--primary-color");

  useEffect(() => {
    init(ref.current as HTMLElement).setOption({
      // color: `rgb(${PrimaryColor})`,
      useDirtyRect: true,
      ...options,
    });
    if (resizeObserver) resizeObserver.observe(ref.current as HTMLElement);
  }, [PrimaryColor, options]);
  return <div ref={ref} style={{ height: "100%", width: "100%" }} />;
};

export default Chart;
