import React from "react";
import Link from "next/link";

export default function StatsCard(props) {
  return (
    <div className={`bg-container bg-${props.color}-900 p-3 rounded-md shadow-md`}>
      <div className="flex items-center gap-2">
        <div className={`bg-${props.color}-400 p-2 rounded-full`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-flag-fill" viewBox="0 0 16 16">
            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
          </svg>
        </div>
        <h3 className="text-white">{props.title}</h3>
      </div>
      <h4 className="text-white text-3xl font-bold mt-5">{props.main}</h4>
      <Link href={props.link} className="flex items-center gap-2 mt-5 py-2 text-xs text-white group">
        <span>Lihat Selengkapnya</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="group-hover:ml-2 group-hover:duration-300" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </Link>
    </div>
  );
}
