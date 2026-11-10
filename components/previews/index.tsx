import * as React from "react"

import { TezzeractButton } from "@/components/ui/TezzeractButton"
import { TezzeractButtonLight } from "@/components/ui/TezzeractButtonLight"
import { TezzeractH1 } from "@/components/ui/TezzeractH1"
import { TezzeractText } from "@/components/ui/TezzeractText"
import { TestimonialTooltip } from "@/components/ui/Tooltip"
import PortfolioCard from "@/components/ui/PortfolioCard"
import BlogCard from "@/components/ui/BlogCard"
import UserCard from "@/components/ui/UserCard"
import TalentCard from "@/components/ui/TalentCard"
import ServiceItem from "@/components/ui/ServiceItem"
import ServiceSlider from "@/components/ui/ServiceSlider"
import ClipPathImage from "@/components/ui/clipath"
import WorldMap from "@/components/ui/world-map"

// A placeholder image bundled with every Next.js app - used so previews
// render something sensible without needing real brand assets.
const PLACEHOLDER_IMAGE = "/globe.svg"

// A dark wrapper for components designed to sit on a dark/blue background
// (most of the Tezzeract brand primitives use white text or white borders).
function DarkStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#05070d] p-10 flex items-center justify-center">
      {children}
    </div>
  )
}

/**
 * A small, illustrative preview per component actually used in
 * tezzeract-temp. Some (Globle, ServiceItem's custom asset, Tooltip's
 * avatar images) reference assets that don't exist in this app, so they'll
 * render with broken images - that's expected and only affects this docs
 * site, not the installed component.
 */
export const previews: Record<string, React.ReactNode> = {
  TezzeractButton: (
    <DarkStage>
      <TezzeractButton>Book a call</TezzeractButton>
    </DarkStage>
  ),
  TezzeractButtonLight: (
    <DarkStage>
      <TezzeractButtonLight>Book a call</TezzeractButtonLight>
    </DarkStage>
  ),
  TezzeractH1: (
    <DarkStage>
      <TezzeractH1>Tezzeract</TezzeractH1>
    </DarkStage>
  ),
  TezzeractText: (
    <DarkStage>
      <TezzeractText>
        This is TezzeractText, used for body copy on dark backgrounds.
      </TezzeractText>
    </DarkStage>
  ),
  Tooltip: (
    <DarkStage>
      <TestimonialTooltip />
    </DarkStage>
  ),
  PortfolioCard: (
    <div className="max-w-xs">
      <PortfolioCard
        tag="Case Study"
        caseStudyTitle="A sample portfolio case study"
        image={PLACEHOLDER_IMAGE}
        slug="sample"
      />
    </div>
  ),
  BlogCard: (
    <div className="max-w-sm">
      <BlogCard
        postImage={PLACEHOLDER_IMAGE}
        postTitle="A sample blog post title"
        tag="Article"
        slug="sample-post"
        author={{
          name: "Jane Doe",
          position: "Content Lead",
          avatar: PLACEHOLDER_IMAGE,
        }}
      />
    </div>
  ),
  UserCard: (
    <UserCard
      name="Jane Doe"
      position="Content Lead"
      avatar={PLACEHOLDER_IMAGE}
    />
  ),
  TalentCard: (
    <DarkStage>
      <TalentCard imageSrc={PLACEHOLDER_IMAGE} alt="Talent" />
    </DarkStage>
  ),
  ServiceItem: (
    <DarkStage>
      <ServiceItem name="Design" avatarSrc={PLACEHOLDER_IMAGE} />
    </DarkStage>
  ),
  ServiceSlider: (
    <DarkStage>
      <ServiceSlider
        services={[
          { name: "Design", avatarSrc: PLACEHOLDER_IMAGE },
          { name: "Engineering", avatarSrc: PLACEHOLDER_IMAGE },
          { name: "Strategy", avatarSrc: PLACEHOLDER_IMAGE },
          { name: "Marketing", avatarSrc: PLACEHOLDER_IMAGE },
        ]}
      />
    </DarkStage>
  ),
  clipath: (
    <div className="h-48 w-48">
      <ClipPathImage />
    </div>
  ),
  "world-map": (
    <WorldMap
      dots={[
        {
          start: { lat: 6.9271, lng: 79.8612 }, // Colombo
          end: { lat: 51.5074, lng: -0.1278 }, // London
        },
      ]}
    />
  ),
}
