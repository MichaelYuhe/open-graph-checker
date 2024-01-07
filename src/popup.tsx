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
  const [url, setUrl] = useState("");
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0].url!);
    });
  }, []);

  useEffect(() => {
    getOG().then((res) => {
      if (res) setOpenGraph(res);
    });
  }, [url]);

  async function getOG(): Promise<OpenGraph | null> {
    const fetchRes = await fetch(url);
    if (!fetchRes.ok) return null;

    const html = await fetchRes.text();
    return parseOpenGraph(html);
  }

  return (
    <div className="p-4 w-[26rem] h-96 overflow-y-auto flex flex-col items-center">
      {openGraph && (
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
