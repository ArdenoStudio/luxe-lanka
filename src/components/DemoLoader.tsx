import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const ARDENO_DUR = 2700;
const LUXE_DUR = 4200;
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const ARDENO_PATH =
    "M 514.300781 878.699219 L 434.792969 718.777344 C 411.382812 739.714844 390.78125 776.453125 391.929688 806.554688 L 415.984375 853.996094 C 416.851562 855.699219 418.324219 857.015625 420.113281 857.679688 L 504.851562 889.203125 C 511.304688 891.605469 517.367188 884.867188 514.300781 878.699219 Z M 371.617188 791.304688 C 371.410156 791.605469 371.222656 791.925781 371.054688 792.265625 L 340.871094 853.445312 C 340.011719 855.183594 338.523438 856.527344 336.707031 857.207031 L 250.40625 889.308594 C 243.988281 891.699219 237.9375 885.042969 240.917969 878.878906 L 369.019531 614.007812 C 371.769531 608.324219 379.851562 608.277344 382.664062 613.929688 L 432.074219 713.316406 C 404.980469 732.679688 383.765625 759.746094 371.617188 791.304688";
const U_PATH =
    "M 162.796875 -3.265625 L 162.796875 0 L 129.453125 0 L 129.453125 -93.546875 C 127.753906 -82.671875 125.695312 -72.757812 123.28125 -63.8125 C 120.863281 -54.875 118.082031 -46.898438 114.9375 -39.890625 C 111.800781 -33.359375 107.875 -26.890625 103.15625 -20.484375 C 98.445312 -14.078125 92.945312 -8.816406 86.65625 -4.703125 C 80.375 -0.597656 73.242188 1.453125 65.265625 1.453125 C 51.972656 1.453125 41.941406 -1.988281 35.171875 -8.875 C 28.398438 -15.769531 23.742188 -24.535156 21.203125 -35.171875 C 18.671875 -45.804688 17.40625 -56.5625 17.40625 -67.4375 L 17.40625 -143.59375 C 17.40625 -155.675781 16.316406 -163.347656 14.140625 -166.609375 C 11.960938 -169.867188 10.269531 -171.5 9.0625 -171.5 L 9.0625 -174.765625 L 42.78125 -174.765625 L 42.78125 -67.4375 C 42.78125 -63.09375 43.019531 -57.894531 43.5 -51.84375 C 43.988281 -45.800781 45.019531 -39.695312 46.59375 -33.53125 C 48.164062 -27.375 50.460938 -21.9375 53.484375 -17.21875 C 56.503906 -12.507812 60.550781 -9.304688 65.625 -7.609375 C 72.632812 -5.429688 79.160156 -6.09375 85.203125 -9.59375 C 91.253906 -13.101562 96.632812 -17.878906 101.34375 -23.921875 C 106.0625 -29.972656 109.628906 -35.65625 112.046875 -40.96875 C 117.359375 -52.570312 121.585938 -66.832031 124.734375 -83.75 C 127.878906 -100.675781 129.453125 -120.625 129.453125 -143.59375 C 129.453125 -155.675781 128.363281 -163.347656 126.1875 -166.609375 C 124.007812 -169.867188 122.316406 -171.5 121.109375 -171.5 L 121.109375 -174.765625 L 154.46875 -174.765625 L 154.46875 -31.1875 C 154.46875 -19.34375 155.613281 -11.726562 157.90625 -8.34375 C 160.207031 -4.957031 161.835938 -3.265625 162.796875 -3.265625 Z";
const X_PATH =
    "M 9.0625 0 L 9.0625 -3.265625 C 13.414062 -3.265625 17.765625 -4.773438 22.109375 -7.796875 C 26.460938 -10.816406 30.570312 -14.257812 34.4375 -18.125 C 38.3125 -22 41.457031 -25.382812 43.875 -28.28125 L 43.515625 -27.921875 L 90.640625 -85.203125 L 35.890625 -157 C 34.929688 -158.207031 33.238281 -159.957031 30.8125 -162.25 C 28.394531 -164.550781 25.796875 -166.664062 23.015625 -168.59375 C 20.242188 -170.53125 17.769531 -171.5 15.59375 -171.5 L 15.59375 -174.765625 L 68.171875 -174.765625 L 68.171875 -171.5 C 64.785156 -171.5 63.394531 -169.925781 64 -166.78125 C 64.601562 -163.644531 66.476562 -159.898438 69.625 -155.546875 L 107.6875 -105.875 L 149.03125 -155.921875 C 153.132812 -160.753906 155.425781 -164.554688 155.90625 -167.328125 C 156.394531 -170.109375 154.101562 -171.5 149.03125 -171.5 L 149.03125 -174.765625 L 179.84375 -174.765625 L 179.84375 -171.5 C 175.488281 -171.5 171.078125 -170.046875 166.609375 -167.140625 C 162.140625 -164.242188 158.03125 -160.800781 154.28125 -156.8125 C 150.53125 -152.832031 147.445312 -149.390625 145.03125 -146.484375 L 109.5 -103.703125 L 175.125 -17.765625 C 176.09375 -16.554688 177.785156 -14.800781 180.203125 -12.5 C 182.617188 -10.207031 185.273438 -8.09375 188.171875 -6.15625 C 191.078125 -4.226562 193.5 -3.265625 195.4375 -3.265625 L 195.4375 0 L 142.859375 0 L 142.859375 -3.265625 C 146.242188 -3.265625 147.691406 -4.832031 147.203125 -7.96875 C 146.722656 -11.113281 144.789062 -14.863281 141.40625 -19.21875 L 92.46875 -83.03125 L 38.078125 -17.40625 C 34.929688 -13.050781 33.238281 -9.601562 33 -7.0625 C 32.757812 -4.53125 34.929688 -3.265625 39.515625 -3.265625 L 39.515625 0 Z";
const CIRCLE_PATH =
    "M 12.328125 -64.171875 C 8.222656 -79.890625 8.285156 -95.238281 12.515625 -110.21875 C 16.742188 -125.207031 24.296875 -138.320312 35.171875 -149.5625 C 46.046875 -160.8125 59.34375 -168.488281 75.0625 -172.59375 C 91.738281 -177.1875 107.445312 -177.304688 122.1875 -172.953125 C 136.9375 -168.609375 149.566406 -161.414062 160.078125 -151.375 C 170.597656 -141.34375 177.789062 -129.925781 181.65625 -117.125 C 172.957031 -117.125 163.59375 -116.757812 153.5625 -116.03125 C 143.53125 -115.300781 134.40625 -113.972656 126.1875 -112.046875 C 135.375 -112.285156 143.410156 -110.226562 150.296875 -105.875 C 157.179688 -101.519531 162.675781 -95.71875 166.78125 -88.46875 C 170.894531 -81.21875 173.195312 -73.363281 173.6875 -64.90625 C 174.644531 -51.851562 171.984375 -40.550781 165.703125 -31 C 159.421875 -21.445312 150.898438 -13.953125 140.140625 -8.515625 C 129.378906 -3.078125 117.59375 0.0625 104.78125 0.90625 C 91.976562 1.75 79.289062 0 66.71875 -4.34375 C 54.144531 -8.695312 43.023438 -15.769531 33.359375 -25.5625 C 23.691406 -35.351562 16.679688 -48.222656 12.328125 -64.171875 Z M 33.71875 -90.28125 C 34.445312 -83.519531 35.535156 -76.992188 36.984375 -70.703125 C 41.816406 -53.296875 48.828125 -39.632812 58.015625 -29.71875 C 67.203125 -19.8125 77.351562 -13.101562 88.46875 -9.59375 C 99.59375 -6.09375 110.648438 -5.3125 121.640625 -7.25 C 132.640625 -9.1875 142.367188 -13.296875 150.828125 -19.578125 C 159.296875 -25.859375 165.34375 -33.894531 168.96875 -43.6875 C 172.59375 -53.476562 172.59375 -64.414062 168.96875 -76.5 C 166.3125 -85.445312 161.597656 -92.941406 154.828125 -98.984375 C 148.054688 -105.023438 139.710938 -108.46875 129.796875 -109.3125 C 119.890625 -110.164062 108.894531 -107.085938 96.8125 -100.078125 C 88.113281 -95.003906 79.59375 -91.4375 71.25 -89.375 C 62.90625 -87.320312 55.226562 -86.535156 48.21875 -87.015625 C 45.800781 -87.265625 43.320312 -87.628906 40.78125 -88.109375 C 38.25 -88.585938 35.894531 -89.3125 33.71875 -90.28125 Z M 153.734375 -118.9375 C 149.140625 -129.320312 142.972656 -138.988281 135.234375 -147.9375 C 127.503906 -156.882812 118.625 -163.59375 108.59375 -168.0625 C 98.5625 -172.53125 87.625 -173.195312 75.78125 -170.0625 C 64.90625 -167.15625 56.265625 -161.648438 49.859375 -153.546875 C 43.453125 -145.453125 39.039062 -136.023438 36.625 -125.265625 C 34.207031 -114.515625 33.238281 -103.820312 33.71875 -93.1875 C 37.832031 -91.25 42.664062 -90.039062 48.21875 -89.5625 C 54.988281 -89.320312 62.421875 -90.164062 70.515625 -92.09375 C 78.617188 -94.03125 86.898438 -97.414062 95.359375 -102.25 C 105.273438 -108.050781 115.425781 -112.160156 125.8125 -114.578125 C 136.207031 -116.992188 145.515625 -118.445312 153.734375 -118.9375 Z";
const L_CALLI_PATH =
    "M 125.609375 -53.34375 C 134.335938 -53.34375 144.601562 -52.453125 156.40625 -50.671875 C 168.207031 -48.898438 180.085938 -46.554688 192.046875 -43.640625 C 204.015625 -40.734375 214.203125 -37.828125 222.609375 -34.921875 C 233.921875 -45.265625 242.972656 -54.71875 249.765625 -63.28125 C 256.554688 -71.851562 262.617188 -80.742188 267.953125 -89.953125 C 273.285156 -99.171875 279.023438 -110.003906 285.171875 -122.453125 C 291.316406 -134.898438 299.238281 -150.015625 308.9375 -167.796875 C 299.5625 -166.179688 290.425781 -164.804688 281.53125 -163.671875 C 272.644531 -162.546875 264.96875 -161.984375 258.5 -161.984375 C 235.21875 -161.984375 214.523438 -165.863281 196.421875 -173.625 C 178.316406 -181.382812 164.085938 -192.210938 153.734375 -206.109375 C 143.390625 -220.015625 138.21875 -236.019531 138.21875 -254.125 C 138.21875 -269.320312 141.773438 -282.984375 148.890625 -295.109375 C 156.003906 -307.234375 165.625 -317.578125 177.75 -326.140625 C 189.875 -334.710938 203.289062 -341.34375 218 -346.03125 C 232.707031 -350.71875 247.5 -353.0625 262.375 -353.0625 C 276.601562 -353.0625 291.960938 -350.957031 308.453125 -346.75 C 324.941406 -342.550781 341.269531 -335.679688 357.4375 -326.140625 C 373.601562 -316.609375 387.988281 -304.082031 400.59375 -288.5625 C 406.09375 -294.707031 413.53125 -301.660156 422.90625 -309.421875 C 432.28125 -317.179688 442.300781 -323.96875 452.96875 -329.78125 C 463.644531 -335.601562 473.507812 -338.515625 482.5625 -338.515625 C 498.726562 -338.515625 506.8125 -330.429688 506.8125 -314.265625 C 506.8125 -302.304688 502.039062 -290.019531 492.5 -277.40625 C 482.957031 -264.800781 470.507812 -252.4375 455.15625 -240.3125 C 439.800781 -228.1875 422.90625 -216.867188 404.46875 -206.359375 C 386.039062 -195.847656 367.773438 -186.875 349.671875 -179.4375 C 331.890625 -147.4375 313.457031 -118.257812 294.375 -91.90625 C 275.300781 -65.550781 254.289062 -45.585938 231.34375 -32.015625 C 248.476562 -26.835938 265.613281 -22.144531 282.75 -17.9375 C 299.882812 -13.738281 317.34375 -11.640625 335.125 -11.640625 C 360.664062 -11.640625 382.8125 -20.691406 401.5625 -38.796875 C 410.613281 -47.847656 417.238281 -54.554688 421.4375 -58.921875 C 425.644531 -63.285156 428.394531 -66.273438 429.6875 -67.890625 C 430.988281 -69.515625 431.960938 -70.328125 432.609375 -70.328125 C 433.898438 -70.328125 434.546875 -69.191406 434.546875 -66.921875 C 434.546875 -66.597656 433.085938 -64.65625 430.171875 -61.09375 C 427.265625 -57.539062 420.800781 -50.59375 410.78125 -40.25 C 382.976562 -11.476562 352.425781 2.90625 319.125 2.90625 C 308.769531 2.90625 297.691406 1.453125 285.890625 -1.453125 C 274.097656 -4.359375 262.625 -7.992188 251.46875 -12.359375 C 240.3125 -16.734375 230.367188 -20.695312 221.640625 -24.25 C 209.347656 -17.132812 195.601562 -10.828125 180.40625 -5.328125 C 165.21875 0.160156 150.832031 2.90625 137.25 2.90625 C 122.695312 2.90625 110.488281 0 100.625 -5.8125 C 90.769531 -11.632812 85.84375 -19.070312 85.84375 -28.125 C 85.84375 -34.59375 88.992188 -40.410156 95.296875 -45.578125 C 101.597656 -50.753906 111.703125 -53.34375 125.609375 -53.34375 Z M 146.953125 -262.375 C 146.953125 -248.46875 150.507812 -236.421875 157.625 -226.234375 C 164.738281 -216.054688 173.953125 -207.570312 185.265625 -200.78125 C 196.578125 -193.988281 208.695312 -188.894531 221.625 -185.5 C 234.5625 -182.113281 246.851562 -180.421875 258.5 -180.421875 C 268.84375 -180.421875 279.101562 -180.90625 289.28125 -181.875 C 299.46875 -182.84375 309.578125 -183.972656 319.609375 -185.265625 C 331.242188 -202.722656 343.125 -220.097656 355.25 -237.390625 C 367.375 -254.691406 381.195312 -270.457031 396.71875 -284.6875 C 385.070312 -298.914062 371.570312 -310.632812 356.21875 -319.84375 C 340.863281 -329.0625 325.019531 -335.929688 308.6875 -340.453125 C 292.363281 -344.984375 276.765625 -347.25 261.890625 -347.25 C 248.628906 -347.25 235.289062 -345.390625 221.875 -341.671875 C 208.457031 -337.953125 196.085938 -332.453125 184.765625 -325.171875 C 173.453125 -317.898438 164.320312 -309.007812 157.375 -298.5 C 150.425781 -288 146.953125 -275.957031 146.953125 -262.375 Z M 356.46875 -192.046875 C 375.539062 -198.515625 393.722656 -206.679688 411.015625 -216.546875 C 428.316406 -226.410156 443.675781 -237.160156 457.09375 -248.796875 C 470.507812 -260.429688 481.175781 -271.988281 489.09375 -283.46875 C 497.019531 -294.945312 500.984375 -305.210938 500.984375 -314.265625 C 500.984375 -326.554688 495.003906 -332.703125 483.046875 -332.703125 C 476.898438 -332.703125 470.1875 -330.84375 462.90625 -327.125 C 455.632812 -323.40625 448.28125 -318.796875 440.84375 -313.296875 C 433.414062 -307.804688 426.789062 -302.148438 420.96875 -296.328125 C 415.144531 -290.503906 410.617188 -285.332031 407.390625 -280.8125 C 412.554688 -272.726562 416.914062 -265.53125 420.46875 -259.21875 C 424.03125 -252.914062 425.8125 -249.441406 425.8125 -248.796875 C 425.8125 -247.179688 425.164062 -246.375 423.875 -246.375 C 422.257812 -246.375 420.316406 -248.878906 418.046875 -253.890625 C 415.785156 -258.898438 411.097656 -266.09375 403.984375 -275.46875 C 394.929688 -262.539062 386.609375 -248.960938 379.015625 -234.734375 C 371.421875 -220.503906 363.90625 -206.273438 356.46875 -192.046875 Z M 214.84375 -26.1875 C 199.96875 -30.71875 184.929688 -35.40625 169.734375 -40.25 C 154.546875 -45.101562 139.03125 -47.53125 123.1875 -47.53125 C 112.84375 -47.53125 105 -45.507812 99.65625 -41.46875 C 94.320312 -37.425781 91.65625 -32.65625 91.65625 -27.15625 C 91.65625 -22.3125 95.453125 -17.054688 103.046875 -11.390625 C 110.648438 -5.734375 121.726562 -2.90625 136.28125 -2.90625 C 151.15625 -2.90625 164.734375 -5.003906 177.015625 -9.203125 C 189.304688 -13.410156 201.914062 -19.070312 214.84375 -26.1875 Z";

function parseInlineStyle(cssText: string): React.CSSProperties {
    const result: Record<string, string> = {};
    cssText.split(";").forEach((decl) => {
        const [prop, val] = decl.split(":").map((s) => s.trim());
        if (!prop || !val) return;
        const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        result[camel] = val;
    });
    return result as React.CSSProperties;
}

function StaggerText({
    text,
    baseDelay,
    style,
    charStyle,
    animation = "avl-charIn",
}: {
    text: string;
    baseDelay: number;
    style?: React.CSSProperties;
    charStyle: string;
    animation?: string;
}) {
    return (
        <div style={style}>
            {[...text].map((ch, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        opacity: 0,
                        animation: `${animation} 0.7s cubic-bezier(0.22,1,0.36,1) ${(baseDelay + i * 0.06).toFixed(2)}s forwards`,
                        ...parseInlineStyle(charStyle),
                    }}
                >
                    {ch === " " ? "\u00A0" : ch}
                </span>
            ))}
        </div>
    );
}

export interface DemoLoaderProps {
    onComplete?: () => void;
    demoName?: string;
    demoLogoUrl?: string;
}

export default function DemoLoader({ onComplete }: DemoLoaderProps) {
    const [phase, setPhase] = useState<1 | 2>(1);
    const [p1Out, setP1Out] = useState(false);
    const [p1Flash, setP1Flash] = useState(false);
    const [p2In, setP2In] = useState(false);
    const [progress, setProgress] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const progRafRef = useRef<number>(0);
    const lastProgressRef = useRef(0);

    // Progress tracking for Phase 1
    useEffect(() => {
        const start = Date.now();
        const duration = ARDENO_DUR * 0.85;
        const tick = () => {
            const raw = Math.min(((Date.now() - start) / duration) * 100, 100);
            const rounded = Math.round(raw);
            if (rounded !== lastProgressRef.current) {
                lastProgressRef.current = rounded;
                setProgress(rounded);
            }
            if (raw < 100) progRafRef.current = requestAnimationFrame(tick);
        };
        progRafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(progRafRef.current);
    }, []);

    // Sequencer
    useEffect(() => {
        const t1 = setTimeout(() => {
            setP1Flash(true);
            setTimeout(() => setP1Out(true), 100);
        }, ARDENO_DUR);

        const L2 = ARDENO_DUR + 300;
        const t2 = setTimeout(() => {
            setPhase(2);
            setTimeout(() => setP2In(true), 16);
        }, L2);

        const t3 = setTimeout(() => {
            if (onComplete) onComplete();
        }, L2 + LUXE_DUR + 600);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    // Canvas particles for Phase 2
    useEffect(() => {
        if (phase !== 2) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d")!;
        const pts = Array.from({ length: 20 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 2 + 0.8,
            speed: Math.random() * 0.35 + 0.12,
            op: Math.random() * 0.15 + 0.04,
            dx: (Math.random() - 0.5) * 0.3,
        }));
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220,170,60,${p.op})`;
                ctx.fill();
                p.y -= p.speed;
                p.x += p.dx;
                if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            });
            rafRef.current = requestAnimationFrame(draw);
        };
        draw();
        const stop = setTimeout(() => cancelAnimationFrame(rafRef.current), LUXE_DUR + 800);
        return () => { cancelAnimationFrame(rafRef.current); clearTimeout(stop); };
    }, [phase]);

    return (
        <motion.div
            style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", background: "#050302" }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.7, 0, 0.2, 1] } }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Sora:wght@300;400&family=Cinzel:wght@400;600&display=swap');

        /* ── Phase 1: upgraded avl- keyframes ─────────────────────── */
        @keyframes avl-breathe {
          0%,100% { opacity:0.3; transform:scale(1); filter:blur(20px); }
          50%      { opacity:0.6; transform:scale(1.15); filter:blur(30px); }
        }
        @keyframes avl-drawPath {
          from { stroke-dashoffset:2000; filter:drop-shadow(0 0 2px rgba(212,184,150,0)); }
          to   { stroke-dashoffset:0;    filter:drop-shadow(0 0 12px rgba(212,184,150,0.6)); }
        }
        @keyframes avl-fillFade {
          from { opacity:0; filter:blur(4px); transform:scale(0.95); }
          to   { opacity:1; filter:blur(0px); transform:scale(1); }
        }
        @keyframes avl-charIn {
          from { opacity:0; transform:translateY(20px) scale(1.15); filter:blur(12px) brightness(2); letter-spacing:0.05em; }
          to   { opacity:1; transform:translateY(0) scale(1); filter:blur(0) brightness(1); letter-spacing:0.18em; }
        }
        @keyframes avl-charInUp {
          from { opacity:0; transform:translateY(15px) scale(0.9); filter:blur(8px); }
          to   { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
        }
        @keyframes avl-crownReveal {
          from { opacity:0; transform:translateY(-20px) scale(0.9); filter:blur(10px); }
          to   { opacity:1; transform:translateY(0) scale(1); filter:blur(0px); }
        }
        @keyframes avl-fadeOutPhase {
          from { opacity:1; transform:scale(1); filter:blur(0px); }
          to   { opacity:0; transform:scale(1.05); filter:blur(14px); }
        }
        @keyframes avl-fadeInPhase {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes avl-flashGold {
          0%   { opacity:0; }
          40%  { opacity:1; filter:blur(10px); }
          100% { opacity:0; filter:blur(0px); }
        }
        .avl-glass-overlay {
          backdrop-filter: blur(8px);
          background: radial-gradient(ellipse at 50% 45%, rgba(18,14,10,0.92) 0%, rgba(0,0,0,0.98) 100%);
        }

        /* ── Phase 2: original keyframes (preserved) ──────────────── */
        @keyframes breathe    { 0%,100%{opacity:.5;transform:scale(1)}   50%{opacity:1;transform:scale(1.1)} }
        @keyframes drawLogo   { from{stroke-dashoffset:4000;opacity:.2} to{stroke-dashoffset:0;opacity:1} }
        @keyframes fillFade   { from{opacity:0} to{opacity:1} }
        @keyframes logoReveal { from{opacity:0;transform:translateY(10px);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
        @keyframes subtitleIn { from{opacity:0;letter-spacing:.55em;filter:blur(4px)} to{opacity:1;letter-spacing:.40em;filter:blur(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
      `}</style>

            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    {/* Phase 1 — Ardeno A gradients (gold) */}
                    <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e8d5b7" />
                        <stop offset="50%" stopColor="#f5e6ce" />
                        <stop offset="100%" stopColor="#c4a97d" />
                    </linearGradient>
                    <linearGradient id="gStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4b896" />
                        <stop offset="50%" stopColor="#f0dfc3" />
                        <stop offset="100%" stopColor="#b8956a" />
                    </linearGradient>
                    <filter id="gGlow">
                        <feGaussianBlur stdDeviation="8" result="g" />
                        <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    {/* Phase 2 — Luxe Lanka logo gradients */}
                    <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4b896" />
                        <stop offset="45%" stopColor="#f0dfc3" />
                        <stop offset="100%" stopColor="#b8956a" />
                    </linearGradient>
                    <linearGradient id="lg2s" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c8a87e" />
                        <stop offset="50%" stopColor="#f5e6ce" />
                        <stop offset="100%" stopColor="#a8885a" />
                    </linearGradient>
                    <filter id="logoGlow2">
                        <feGaussianBlur stdDeviation="4" result="g" />
                        <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
            </svg>

            {/* ── PHASE 1 — ARDENO STUDIO ──────────────────────────────── */}
            <div
                className="avl-glass-overlay"
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: 3,
                    perspective: "1000px",
                    animation: p1Out
                        ? "avl-fadeOutPhase 0.4s cubic-bezier(0.22,1,0.36,1) forwards"
                        : "avl-fadeInPhase 1s ease-out forwards",
                }}
            >
                {/* Grain */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_URL, opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none" }} />
                {/* Vignette */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.85) 100%)", pointerEvents: "none" }} />
                {/* Ambient gold glow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%,rgba(212,184,150,0.1) 0%,transparent 50%)", animation: "avl-breathe 5s ease-in-out infinite", pointerEvents: "none" }} />

                {/* Flash overlay */}
                {p1Flash && (
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%,rgba(212,184,150,0.15) 0%,transparent 80%)", animation: "avl-flashGold 0.6s cubic-bezier(.16,1,.3,1) forwards", pointerEvents: "none", zIndex: 10 }} />
                )}

                {/* Center content */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

                        {/* A-mark */}
                        <div style={{ width: 80, height: 80, marginBottom: 8, opacity: 0, animation: "avl-crownReveal 1.4s cubic-bezier(.16,1,.3,1) .1s forwards" }}>
                            <svg viewBox="200 580 360 340" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                                <path d={ARDENO_PATH} fill="none" stroke="rgba(212,184,150,0.06)" strokeWidth={1} />
                                <path
                                    d={ARDENO_PATH}
                                    fill="none"
                                    stroke="url(#gStroke)"
                                    strokeLinecap="round"
                                    strokeWidth={3.5}
                                    style={{ strokeDasharray: 2000, animation: "avl-drawPath 2.2s cubic-bezier(.2,1,.4,1) .4s forwards" }}
                                />
                                <path
                                    d={ARDENO_PATH}
                                    fill="url(#gGrad)"
                                    filter="url(#gGlow)"
                                    style={{ opacity: 0, transformOrigin: "center", animation: "avl-fillFade 1.4s cubic-bezier(.16,1,.3,1) 1.8s forwards" }}
                                />
                            </svg>
                        </div>

                        {/* Wordmark */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <StaggerText
                                text="ARDENO"
                                baseDelay={0.8}
                                animation="avl-charIn"
                                charStyle="font-family:'Cinzel',serif;font-size:clamp(24px,8vw,34px);font-weight:600;color:#e8d5b7;letter-spacing:.18em;text-shadow:0 0 16px rgba(212,184,150,0.35)"
                            />
                            <StaggerText
                                text="STUDIO"
                                baseDelay={1.4}
                                animation="avl-charInUp"
                                charStyle="font-family:'Cormorant Garamond',serif;font-size:clamp(10px,4vw,15px);font-weight:300;font-style:italic;color:rgba(212,184,150,0.65);letter-spacing:.5em;text-shadow:0 0 10px rgba(212,184,150,0.3)"
                            />
                        </div>
                    </div>
                </div>

                {/* Progress bar — floating centered */}
                <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", width: 280, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                    <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", margin: 0 }}>
                        {progress < 100 ? "LOADING" : "INITIALIZING"}
                    </p>
                    <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, #c8a87e)",
                            transformOrigin: "left",
                            transform: `scaleX(${progress / 100})`,
                            transition: "transform 0.1s ease-out",
                        }} />
                    </div>
                </div>
            </div>

            {/* ── PHASE 2 — LUXE LANKA (preserved exactly) ─────────────── */}
            {phase === 2 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        overflow: "hidden",
                        background: "radial-gradient(ellipse at 50% 42%,#14120e 0%,#0c0a07 50%,#040302 100%)",
                        zIndex: 2,
                        opacity: p2In ? undefined : 0,
                        animation: p2In ? "fadeIn .9s cubic-bezier(.22,1,.36,1) forwards" : undefined,
                    }}
                >
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: GRAIN_URL, opacity: 0.06, mixBlendMode: "overlay" }} />
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.7) 100%)", pointerEvents: "none" }} />
                    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, position: "relative", zIndex: 2 }}>
                        <div style={{ opacity: 0, animation: "logoReveal 1.1s cubic-bezier(.22,1,.36,1) .2s forwards" }}>
                            <svg viewBox="120 130 1200 810" style={{ width: 300, height: "auto", filter: "drop-shadow(0 0 16px rgba(214,193,146,.2))", transform: "translateX(14px)" }}>
                                <g transform="translate(166,488)" style={{ opacity: 0, animation: "fillFade 1.4s ease 0.3s forwards" }}>
                                    <path d={L_CALLI_PATH} transform="translate(0.606923,354.301732)" fill="url(#lg2)" filter="url(#logoGlow2)" />
                                </g>
                                <g transform="translate(617,567)">
                                    <path d={U_PATH} transform="translate(1.980039,271.620235)" fill="none" stroke="url(#lg2s)" strokeWidth={3} style={{ strokeDasharray: 4000, strokeDashoffset: 4000, animation: "drawLogo 2.4s cubic-bezier(.22,1,.36,1) 1.0s forwards" }} />
                                    <path d={U_PATH} transform="translate(1.980039,271.620235)" fill="url(#lg2)" style={{ opacity: 0, animation: "fillFade 1s ease 2.6s forwards" }} />
                                    <path d={X_PATH} transform="translate(173.83959,271.620235)" fill="none" stroke="url(#lg2s)" strokeWidth={3} style={{ strokeDasharray: 4000, strokeDashoffset: 4000, animation: "drawLogo 2.4s cubic-bezier(.22,1,.36,1) 1.25s forwards" }} />
                                    <path d={X_PATH} transform="translate(173.83959,271.620235)" fill="url(#lg2)" style={{ opacity: 0, animation: "fillFade 1s ease 2.8s forwards" }} />
                                    <path d={CIRCLE_PATH} transform="translate(378.330727,271.620235)" fill="none" stroke="url(#lg2s)" strokeWidth={3} style={{ strokeDasharray: 4000, strokeDashoffset: 4000, animation: "drawLogo 2.4s cubic-bezier(.22,1,.36,1) 1.5s forwards" }} />
                                    <path d={CIRCLE_PATH} transform="translate(378.330727,271.620235)" fill="url(#lg2)" style={{ opacity: 0, animation: "fillFade 1s ease 3.0s forwards" }} />
                                </g>
                                <g transform="translate(942,851)" style={{ opacity: 0, animation: "fillFade 1.2s ease 2.8s forwards" }}>
                                    <path d="M 21.46875 -3.4375 L 21.46875 0 L 3.296875 0 L 3.296875 -30.796875 L 7.125 -30.796875 L 7.078125 -3.4375 Z" transform="translate(3.404571,54.603632)" fill="url(#lg2)" />
                                    <path d="M 21.25 -8.96875 L 8.703125 -8.96875 L 5.453125 0 L 1.578125 0 L 13.15625 -30.796875 L 16.765625 -30.796875 L 28.40625 0 L 24.546875 0 Z M 20.140625 -12 L 15 -25.953125 L 14.828125 -25.953125 L 9.8125 -12 Z" transform="translate(43.516155,54.603632)" fill="url(#lg2)" />
                                    <path d="M 3.296875 -30.796875 L 7.5625 -30.796875 L 24.0625 -6.0625 L 24.234375 -6.0625 L 24.234375 -30.796875 L 27.96875 -30.796875 L 27.96875 0 L 23.65625 0 L 7.21875 -24.375 L 7.03125 -24.375 L 7.03125 0 L 3.296875 0 Z" transform="translate(90.267051,54.603632)" fill="url(#lg2)" />
                                    <path d="M 3.203125 -30.796875 L 7 -30.796875 L 7 -17.15625 L 7.21875 -17.15625 L 19.4375 -30.796875 L 24.0625 -30.796875 L 11.921875 -17.546875 L 24.984375 0 L 20.546875 0 L 9.59375 -14.78125 L 7 -12 L 7 0 L 3.203125 0 Z" transform="translate(138.380984,54.603632)" fill="url(#lg2)" />
                                    <path d="M 21.25 -8.96875 L 8.703125 -8.96875 L 5.453125 0 L 1.578125 0 L 13.15625 -30.796875 L 16.765625 -30.796875 L 28.40625 0 L 24.546875 0 Z M 20.140625 -12 L 15 -25.953125 L 14.828125 -25.953125 L 9.8125 -12 Z" transform="translate(182.669616,54.603632)" fill="url(#lg2)" />
                                </g>
                            </svg>
                        </div>
                        <div style={{ opacity: 0, animation: "subtitleIn 1.1s cubic-bezier(.22,1,.36,1) 3.2s forwards", marginTop: -8 }}>
                            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 9, fontWeight: 300, color: "rgba(214,193,146,.35)", letterSpacing: ".38em" }}>
                                PRECISION &nbsp;·&nbsp; ELEGANCE
                            </span>
                        </div>
                    </div>
                </div>
            )}

        </motion.div>
    );
}
