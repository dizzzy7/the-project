import { selectedPointsAtom } from "@/atoms";
import { useAtom } from "jotai";
import { Path } from "./types";

const BezierLines = (props: { path: Path }) => {
  const [selectedPoints, setSelectedPoints] = useAtom(selectedPointsAtom);

  return props.path.map((point, index) => {
    if (point.type === "C") {
      const previousPoint = props.path[index - 1];
      return (
        <g key={`bezierLines-${index}`}>
          <line
            x1={previousPoint.x}
            y1={previousPoint.y}
            x2={point.c1?.x}
            y2={point.c1?.y}
            stroke="#0008"
          />
          <line
            x1={point.x}
            y1={point.y}
            x2={point.c2?.x}
            y2={point.c2?.y}
            stroke="#0008"
          />
        </g>
      )
    }
  })

}

export default BezierLines;