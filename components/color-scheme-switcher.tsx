"use client";

import { Check, Circle } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const colors = [
  {
    name: "Zinc",
    value: "zinc",
  },
  {
    name: "Slate",
    value: "slate",
  },
  {
    name: "Stone",
    value: "stone",
  },
  {
    name: "Gray",
    value: "gray",
  },
  {
    name: "Neutral",
    value: "neutral",
  },
  {
    name: "Red",
    value: "red",
  },
  {
    name: "Rose",
    value: "rose",
  },
  {
    name: "Orange",
    value: "orange",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Yellow",
    value: "yellow",
  },
  {
    name: "Violet",
    value: "violet",
  },
] as const;

export function ColorSchemeSwitcher() {
  const { color, setColor } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-start">
          <Circle className={`mr-2 size-4 fill-primary`} />
          {colors.find((c) => c.value === color)?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        {colors.map((c) => (
          <DropdownMenuItem
            key={c.value}
            onClick={() => setColor(c.value)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Circle className={cn(`mr-2 size-4 fill-${c.value}-500`)} />
              {c.name}
            </div>
            {color === c.value && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
