import type { Metadata } from "next";
import Architecture from "./_components/Architecture";
import Hero from "./_components/Hero";
import Manifesto from "./_components/Manifesto";
import Modules from "./_components/Modules";
import Perspectives from "./_components/Perspectives";
import Thesis from "./_components/Thesis";
import Workflow from "./_components/Workflow";

export const metadata: Metadata = {
  title: "CoVault — Knowledge, Verified and Vaulted.",
  description:
    "CoVault is a cloud-native academic knowledge platform and private social network built for universities: verified resources, role-governed communities and institutional memory under one tenant boundary.",
};

export default function CoVaultPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Workflow />
      <Modules />
      <Architecture />
      <Thesis />
      <Perspectives />
    </>
  );
}
