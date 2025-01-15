import React, { ReactElement } from "react";
import ShareIcon from "../../Icons/ShareIcon";
import DeleteIcon from "../../Icons/DeleteIcon";

interface cardProps {
  title: string;
  type: "youtube" | "twitter";
  cardIconVariant: ReactElement;
  link: string;
}

const Card = (props: cardProps) => {
  console.log(props.link.split("/"));
  console.log(
    `https://www.youtube.com/embed/${props.link.split("/").slice(-1)[0]}`
  );
  return (
    <div className="flex flex-col min-w-80 max-w-96 min-h-96 h-auto w-auto border-slate-200 border-2 rounded-md p-4 gap-4">
      <div className="flex justify-between gap-6">
        <div className="flex gap-2 items-center">
          <div>{props.cardIconVariant}</div>
          <div className="text-2xl">{props.title}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <ShareIcon />
          </div>
          <div>
            <DeleteIcon />
          </div>
        </div>
      </div>

      {props.type === "youtube" ? (
        <iframe
          src={`https://www.youtube.com/embed/${props.link
            .split("/")
            .slice(-1)[0]
            .replace("watch?v=", "")}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : (
        <blockquote className="twitter-tweet">
          <a href={props.link.replace("x", "twitter")}></a>
        </blockquote>
      )}
    </div>
  );
};

export default Card;
