import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <div className="relative">
      <Container>
        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          <span>Created by </span>
          <a
            href="https://lydiajanefrancis.com"
            target="_blank"
            className="hover:text-gray-500"
          >
            Lydia Francis
          </a>
          <span> with </span>
          <a
            href="https://web3templates.com"
            target="_blank"
            className="hover:text-gray-500"
          >
            Web3Templates
          </a>
          <span> © {new Date().getFullYear()}</span>
        </div>
      </Container>
    </div>
  );
}
