import type Prisma from "@prisma/client";
import { useState } from "react";

import { EditSmoothieForm } from "./EditSmoothieForm";

import { SmoothieBody } from "./SmoothieBody";
type SmoothieProps = Prisma.smoothies;

export const Smoothie = ({ smoothie }: { smoothie: SmoothieProps }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <EditSmoothieForm setEditing={setEditing} smoothie={smoothie} />;
  }
  return <SmoothieBody smoothie={smoothie} setEditing={setEditing} />;
};
