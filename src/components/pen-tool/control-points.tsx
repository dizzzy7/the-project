import { selectedPointsAtom } from "@/atoms";
import { useAtom } from "jotai";
import { Path } from "./types";

const ControlPoints = (props: { path: Path }) => {
  const [selectedPoints, setSelectedPoints] = useAtom(selectedPointsAtom);

  return props.path.map((point, index) => {
    const hasControlPoint1 = point.type === "C" && point.c1;
    const hasControlPoint2 = (point.type === "C") && point.c2;
    return (
      <g key={`points-${index}`}>
        {point.x && point.y &&
          <circle
            type="anchor"
            cx={point.x}
            cy={point.y}
            r="3"
            fill={selectedPoints[1].has(index) ? "lightblue" : 'transparent'}
            stroke="lightblue"
            strokeWidth={2}
          />}
        {hasControlPoint1 &&
          <circle
            type="anchor"
            cx={point.c1?.x}
            cy={point.c1?.y}
            r="3"
            fill={selectedPoints[1].has(index) ? "lightblue" : 'transparent'}
            stroke="lightblue"
            strokeWidth={2}
          />
        }
        {hasControlPoint2 &&
          <circle
            type="anchor"
            cx={point.c2?.x}
            cy={point.c2?.y}
            r="3"
            fill={selectedPoints[1].has(index) ? "lightblue" : 'transparent'}
            stroke="lightblue"
            strokeWidth={2}
          />
        }
      </g>
    )
  })

}

export default ControlPoints;