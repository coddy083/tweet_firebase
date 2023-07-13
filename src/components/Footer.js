import React from "react";

export default function Footer() {
  return (
    <footer className="w-96 mx-auto text-center font-bold">
      &copy; {new Date().getFullYear()} Nwitter
    </footer>
  );
}
