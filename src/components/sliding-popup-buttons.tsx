"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WeatherLegend from "@/stories/WeatherIconLegend";
import { ShowSunnyDaysToggle } from "@/stories/ShowSunnyDaysToggle";

interface ButtonData {
  id: string;
  label: string;
  content: {
    first: {
      title: string;
      description: string;
    };
    second: {
      title: string;
      description: string;
    };
  };
}

const buttons: ButtonData[] = [
  {
    id: "january",
    label: "Jan",
    content: {
      first: {
        title: "Early January",
        description:
          "New Year resolutions and fresh starts. Time for goal setting and winter activities.",
      },
      second: {
        title: "Late January",
        description:
          "Settling into new routines. Winter sports and cozy indoor activities.",
      },
    },
  },
  {
    id: "february",
    label: "Feb",
    content: {
      first: {
        title: "Early February",
        description:
          "Groundhog Day and winter's peak. Perfect for indoor hobbies and planning.",
      },
      second: {
        title: "Late February",
        description: "Valentine's Day romance and hints of spring approaching.",
      },
    },
  },
  {
    id: "march",
    label: "Mar",
    content: {
      first: {
        title: "Early March",
        description:
          "Spring equinox approaches. First signs of nature awakening.",
      },
      second: {
        title: "Late March",
        description:
          "Spring officially begins! Longer days and warmer weather.",
      },
    },
  },
  {
    id: "april",
    label: "Apr",
    content: {
      first: {
        title: "Early April",
        description:
          "April Fool's Day and Easter celebrations. Spring cleaning begins.",
      },
      second: {
        title: "Late April",
        description:
          "Flowers bloom everywhere. Perfect weather for outdoor activities.",
      },
    },
  },
  {
    id: "may",
    label: "May",
    content: {
      first: {
        title: "Early May",
        description: "May Day celebrations and Mother's Day preparations.",
      },
      second: {
        title: "Late May",
        description: "Memorial Day weekend and the unofficial start of summer.",
      },
    },
  },
  {
    id: "june",
    label: "Jun",
    content: {
      first: {
        title: "Early June",
        description: "Graduation season and Father's Day preparations.",
      },
      second: {
        title: "Late June",
        description:
          "Summer solstice! Longest day of the year and vacation season begins.",
      },
    },
  },
  {
    id: "july",
    label: "Jul",
    content: {
      first: {
        title: "Early July",
        description: "Independence Day celebrations and peak summer heat.",
      },
      second: {
        title: "Late July",
        description: "Dog days of summer. Beach trips and outdoor barbecues.",
      },
    },
  },
  {
    id: "august",
    label: "Aug",
    content: {
      first: {
        title: "Early August",
        description: "Summer vacation peak and back-to-school shopping begins.",
      },
      second: {
        title: "Late August",
        description: "Final summer adventures before school starts.",
      },
    },
  },
  {
    id: "september",
    label: "Sep",
    content: {
      first: {
        title: "Early September",
        description: "Back to school season and Labor Day weekend.",
      },
      second: {
        title: "Late September",
        description: "Autumn equinox and fall foliage begins to change.",
      },
    },
  },
  {
    id: "october",
    label: "Oct",
    content: {
      first: {
        title: "Early October",
        description: "Harvest season and beautiful fall colors emerge.",
      },
      second: {
        title: "Late October",
        description: "Halloween preparations and peak autumn beauty.",
      },
    },
  },
  {
    id: "november",
    label: "Nov",
    content: {
      first: {
        title: "Early November",
        description: "Daylight saving ends and cozy autumn weather.",
      },
      second: {
        title: "Late November",
        description: "Thanksgiving celebrations and gratitude season.",
      },
    },
  },
  {
    id: "december",
    label: "Dec",
    content: {
      first: {
        title: "Early December",
        description: "Holiday decorations and winter's official arrival.",
      },
      second: {
        title: "Late December",
        description:
          "Christmas and New Year celebrations. Year-end reflections.",
      },
    },
  },
];

export default function SlidingPopupButtons({
  showSunnyDays,
}: {
  showSunnyDays?: boolean;
}) {
  const [activeButton, setActiveButton] = useState({
    monthId: buttons[0].id,
    half: "first" as "first" | "second",
  });
  const [popupPosition, setPopupPosition] = useState({ left: 0, arrowLeft: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate popup position based on active button
  useEffect(() => {
    const activeButtonElement = buttonRefs.current[activeButton.monthId];
    const container = containerRef.current;

    if (activeButtonElement && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButtonElement.getBoundingClientRect();

      const popupWidth = 320; // w-80 = 320px
      const halfOffset =
        activeButton.half === "first"
          ? -buttonRect.width / 4
          : buttonRect.width / 4;
      const buttonHalfCenterRelativeToContainer =
        buttonRect.left -
        containerRect.left +
        buttonRect.width / 2 +
        halfOffset;

      const buttonRow = container.querySelector(".flex");
      if (buttonRow) {
        const firstButton = buttonRefs.current[buttons[0].id];
        const lastButton = buttonRefs.current[buttons[buttons.length - 1].id];

        if (firstButton && lastButton) {
          const firstButtonRect = firstButton.getBoundingClientRect();
          const lastButtonRect = lastButton.getBoundingClientRect();

          const buttonRowLeft = firstButtonRect.left - containerRect.left;
          const buttonRowRight = lastButtonRect.right - containerRect.left;

          const desiredPopupLeft =
            buttonHalfCenterRelativeToContainer - popupWidth / 2;

          let constrainedPopupLeft = desiredPopupLeft;
          if (desiredPopupLeft < buttonRowLeft) {
            constrainedPopupLeft = buttonRowLeft;
          } else if (desiredPopupLeft + popupWidth > buttonRowRight) {
            constrainedPopupLeft = buttonRowRight - popupWidth;
          }

          const arrowLeft =
            buttonHalfCenterRelativeToContainer - constrainedPopupLeft;

          setPopupPosition({
            left: constrainedPopupLeft,
            arrowLeft: arrowLeft,
          });
        }
      }
    }
  }, [activeButton]);

  const activeButtonData = buttons.find(
    (btn) => btn.id === activeButton.monthId
  );
  const activeContent = activeButtonData?.content[activeButton.half];

  return (
    <div className="relative p-1 w-full max-w-full" ref={containerRef}>
      {/* Button Row */}
      <div className="flex gap-2 w-full min-w-0">
        {buttons.map((button) => (
          <div key={button.id} className="relative flex-1 min-w-0">
            <Button
              ref={(el) => {
                buttonRefs.current[button.id] = el;
              }}
              variant="outline"
              className="transition-all duration-200 relative w-full min-w-0"
              tabIndex={-1}
            >
              {/* Left half (first half of month) */}
              <div
                className={cn(
                  "absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10 transition-all duration-200 flex items-center justify-center rounded-l-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  activeButton.monthId === button.id &&
                    activeButton.half === "first"
                    ? "bg-blue-100"
                    : "hover:bg-blue-50"
                )}
                tabIndex={0}
                role="button"
                aria-label={`First half of ${button.label}`}
                onClick={() =>
                  setActiveButton({ monthId: button.id, half: "first" })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveButton({ monthId: button.id, half: "first" });
                  }
                }}
              />
              {/* Right half (second half of month) */}
              <div
                className={cn(
                  "absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10 transition-all duration-200 flex items-center justify-center rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  activeButton.monthId === button.id &&
                    activeButton.half === "second"
                    ? "bg-blue-100"
                    : "hover:bg-blue-50"
                )}
                tabIndex={0}
                role="button"
                aria-label={`Second half of ${button.label}`}
                onClick={() =>
                  setActiveButton({ monthId: button.id, half: "second" })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveButton({ monthId: button.id, half: "second" });
                  }
                }}
              />
              <span
                className={cn(
                  "relative z-20 pointer-events-none font-medium transition-colors duration-200 px-2 py-2 text-gray-900 text-xs"
                )}
              >
                {button.label}
              </span>
            </Button>
          </div>
        ))}
      </div>

      {/* Popup Box */}
      <div
        className="absolute top-full mt-3 bg-blue-500 text-white rounded-lg shadow-lg px-3 py-2 w-100 transition-all duration-300 ease-out z-10"
        style={{
          left: `${popupPosition.left}px`,
        }}
      >
        {/* Popup Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{activeContent?.title}</h3>
            <ShowSunnyDaysToggle className="col-span-7 text-white" />
          </div>

          {/* <p className="text-sm text-gray-300">{activeContent?.description}</p> */}
          <WeatherLegend
            className="rounded-sm"
            showSunnyIcon={showSunnyDays}
          ></WeatherLegend>
        </div>

        {/* Arrow pointing up */}
        <div
          className="absolute bottom-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-500 transition-all duration-300 ease-out"
          style={{
            left: `${popupPosition.arrowLeft}px`,
            transform: "translateX(-50%)",
          }}
        />
        <div
          className="absolute bottom-full w-0 h-0 border-l-7 border-r-7 border-b-7 border-l-transparent border-r-transparent border-b-blue-500 mb-px transition-all duration-300 ease-out"
          style={{
            left: `${popupPosition.arrowLeft}px`,
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}
