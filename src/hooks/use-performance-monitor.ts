import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
}

interface UsePerformanceMonitorOptions {
  componentName: string;
  logThreshold?: number; // in milliseconds
  enabled?: boolean;
}

export function usePerformanceMonitor({
  componentName,
  logThreshold = 16, // ~1 frame at 60fps
  enabled = process.env.NODE_ENV === 'development'
}: UsePerformanceMonitorOptions): void {
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0,
  });

  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const mountStart = performance.now();
    startTimeRef.current = mountStart;

    return () => {
      const mountTime = performance.now() - mountStart;
      metricsRef.current.mountTime = mountTime;

      if (mountTime > logThreshold) {
        console.warn(
          `[Performance] ${componentName} took ${mountTime.toFixed(2)}ms to mount, ` +
          `which is above the ${logThreshold}ms threshold.`
        );
      }
    };
  }, [componentName, logThreshold, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const renderEnd = performance.now();
    const renderTime = renderEnd - startTimeRef.current;
    metricsRef.current.renderTime = renderTime;
    metricsRef.current.updateCount++;

    if (renderTime > logThreshold) {
      console.warn(
        `[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render, ` +
        `which is above the ${logThreshold}ms threshold. ` +
        `Update count: ${metricsRef.current.updateCount}`
      );
    }

    // Log cumulative metrics on component unmount
    return () => {
      const { renderTime, mountTime, updateCount } = metricsRef.current;
      console.info(
        `[Performance] ${componentName} metrics:\n` +
        `• Total render time: ${renderTime.toFixed(2)}ms\n` +
        `• Mount time: ${mountTime.toFixed(2)}ms\n` +
        `• Update count: ${updateCount}`
      );
    };
  });

  // Reset metrics on component re-mount
  useEffect(() => {
    if (!enabled) return;

    metricsRef.current = {
      renderTime: 0,
      mountTime: 0,
      updateCount: 0,
    };
  }, [enabled]);
} 