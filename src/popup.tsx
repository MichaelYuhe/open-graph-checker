import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { parseOpenGraph } from "./util";
import { OpenGraph } from "./type";
import {
  DiscordCard,
  FacebookCard,
  LinkedinCard,
  TwitterCard,
} from "./components/OpenGraphCard";

const Popup = () => {
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      if (!url) return;

      setIsLoading(true);
      getOG(url)
        .then((res) => {
          if (res) setOpenGraph(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, []);

  async function getOG(url: string): Promise<OpenGraph | null> {
    const fetchRes = await fetch(url);
    if (!fetchRes.ok) return null;

    const html = await fetchRes.text();
    return parseOpenGraph(html);
  }

  return (
    <div className="p-4 w-[26rem] h-96 overflow-y-auto flex flex-col items-center">
      <h1 className="text-xl font-bold">Open Graph Checker</h1>

      {isLoading && <p className="text-lg">Loading...</p>}

      {!isLoading && openGraph && (
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col gap-y-2 w-full">
            <h2 className="font-semibold text-lg">Twitter:</h2>

            <TwitterCard {...openGraph.twitter} />
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <h2 className="font-semibold text-lg">Discord:</h2>

            <DiscordCard {...openGraph} />
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <h2 className="font-semibold text-lg">Linkedin:</h2>

            <LinkedinCard {...openGraph} />
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <h2 className="font-semibold text-lg">Facebook:</h2>

            <FacebookCard {...openGraph} />
          </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
