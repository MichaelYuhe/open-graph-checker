import { OpenGraph } from "../type";

export function TwitterCard(twitter: OpenGraph["twitter"]) {
  if (twitter.card === "summary_large_image")
    return (
      <div className="w-96 h-52 relative">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={twitter.image}
          alt={twitter.title}
        />

        <span className="absolute left-4 bottom-4">{twitter.url}</span>
      </div>
    );

  return <></>;
}

export function DiscordCard(opengraph: OpenGraph) {
  return (
    <div className="w-96 pt-6 bg-[#2f3136] p-3 flex flex-col rounded">
      <h1 className="truncate font-bold text-[#4eadee] text-lg mb-2">
        {opengraph.og.title}
      </h1>

      <p className="text-[#dcddde] mb-4">{opengraph.og.description}</p>

      <img
        className="w-full h-48 rounded"
        src={opengraph.og.image}
        alt={opengraph.og.title}
      />
    </div>
  );
}

export function LinkedinCard(opengraph: OpenGraph) {
  return (
    <div className="w-96 shadow-lg">
      <img
        className="w-full h-52"
        src={opengraph.og.image}
        alt={opengraph.og.title}
      />

      <div className="p-2">
        <h1 className="font-bold text-lg truncate">{opengraph.og.title}</h1>

        <h2 className="text-lg text-[#959595]">
          {opengraph.og.url.split("//")[1]}
        </h2>
      </div>
    </div>
  );
}

export function FacebookCard(opengraph: OpenGraph) {
  return (
    <div className="w-96">
      <img
        className="w-full h-52"
        src={opengraph.og.image}
        alt={opengraph.og.title}
      />

      <div className="p-2 bg-[#f2f3f5] ring-1 ring-[#dbdde1]">
        <h2 className="text-lg text-[#61676f]">
          {opengraph.og.url.split("//")[1]}
        </h2>

        <h1 className="font-bold text-lg truncate">{opengraph.og.title}</h1>

        <h2 className="text-[#61676f] truncate">{opengraph.og.description}</h2>
      </div>
    </div>
  );
}
