"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Museum from "./Museum";
import { hasWebGL2 } from "@/lib/webgl";

const Scene3D = dynamic(() => import("./three/Scene3D"), {
  ssr: false,
  loading: () => <Museum />,
});

const noopSubscribe = () => () => {};

export default function SceneRoot() {
  const supported = useSyncExternalStore(noopSubscribe, hasWebGL2, () => false);

  if (!supported) return <Museum />;
  return <Scene3D />;
}
