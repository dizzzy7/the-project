const Path = (props: { pathData: string }) => {
  return (
    <path
      d={props.pathData}
      stroke="#111"
      fill="none"
      strokeWidth={1.8}
    />
  )
}

export default Path;